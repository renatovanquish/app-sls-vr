import { useState, useEffect } from "react";
import { Button, Input, Modal, Segment } from "components/ui";
import { Check, Cross2, Undo, Picture, Trash, Plus2 } from "components/icons";
import { toast } from "react-toast";
import { useRouter } from "next/router";
import { MidiasLib } from "components/admin";
import { useScreen } from "hooks/useScreen";
import { useRelation } from "hooks/useRelation";
import { useRelationLink } from "hooks/useRelationLink";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { RelationModes } from "models";
import { v4 as uuidv4 } from "uuid";

import Contents from "./TabContentsList";
import Schedules from "./TabSchedules";
import Moderation from "./TabModeration";
import TabIntegration from "./TabIntegrations";

type FormValues = {
  type: string;
  name: string;
  description: string;
  reference: string;
  status: string;
  avatar: string;
  groups: {
    group: string;
    subGroups: {
      subGroup: string;
    }[];
  }[];
};

const defaultValues = {
  type: "",
  name: "",
  description: "",
  reference: "",
  status: "",
  avatar: "",
  groups: [],
};

interface Props {
  userID: string;
  content?: any;
  setCurrentItem?: any;
  handleUpdate?: any;
  index?: number;
}

export default function RestrictedContent(props: Props) {
  const { userID, content, setCurrentItem, handleUpdate, index } = props;
  const [loading, setLoading] = useState(false);
  const [tabSel, setTabSel] = useState(0);
  const [contentID, setContentID] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [types, setTypes] = useState([] as any);

  const [certificatePerContent, setCertificatePerContent] = useState(false);
  const [minimumPercentage, setMinimumPercentage] = useState(100);
  const [totalHours, setTotalHours] = useState(120);

  const [modalSel, setModalSel] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { screenWidth, screenHeight } = useScreen();
  const router = useRouter();
  const { createRelation, updateRelation } = useRelation();
  const { createRelationLink } = useRelationLink();

  const [scheduleConfig, setScheduleConfig] = useState("");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const watchName = watch("name");
  const watchType = watch("type");

  const formGroups = useWatch({
    name: "groups",
    control,
  });

  const { fields, append, remove } = useFieldArray({
    name: "groups",
    control,
  });

  useEffect(() => {
    setTypes(
      (process.env.RELATIONS as any).filter((rl: any) => {
        return rl.restricted;
      })
    );
    return () => {
      setTypes([] as any);
    };
  }, []);

  useEffect(() => {
    reset(defaultValues);
    if (content) {
      setIsNew(false);
      setContentID(content.id);
      setValue("type", content.type);
      setValue("name", content.name);
      setValue("description", content.description);
      setValue("reference", content.reference);
      setValue("status", content.status);
      setValue("avatar", content.avatar);
      if (content.config) {
        const config = JSON.parse(content.config);
        config.groups && config.groups.map((f: any) => append(f));

        if (config.certificatePerContent) {
          setCertificatePerContent(true);
        } else {
          setCertificatePerContent(false);
        }

        if (config.minimumPercentage) {
          setMinimumPercentage(config.minimumPercentage);
        } else {
          setMinimumPercentage(100);
        }

        if (config.totalHours) {
          setTotalHours(config.totalHours);
        } else {
          setTotalHours(120);
        }
      }
    } else {
      setIsNew(true);
      setContentID(uuidv4());
      setValue("type", "");
      setValue("name", "");
      setValue("description", "");
      setValue("reference", "");
      setValue("status", "rc-on");
      setValue("avatar", "");
      setCertificatePerContent(false);
      setMinimumPercentage(100);
      setTotalHours(120);
    }
  }, [content, setValue]);

  const handleCheckboxChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (target.name === "certificatePerContent") {
      setCertificatePerContent(value);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    const { type, name, description, reference, status, avatar, groups } = data;
    const search = name.toLowerCase();
    const members = [userID];
    const admins = [userID];
    const mode = RelationModes.GROUP;

    const inputRelation = {
      id: contentID,
      type,
      mode,
      name,
      description,
      reference,
      members,
      admins,
      status,
      search,
      avatar,
      config: JSON.stringify({
        groups,
        certificatePerContent,
        minimumPercentage,
        totalHours
      }),
    } as any;

    console.log(inputRelation);

    const inputRelationLink = {
      userID,
      relationID: contentID,
      type,
      notify: 0,
      search,
    } as any;

    if (isNew) {
      await createRelation(inputRelation);
      await createRelationLink(inputRelationLink);
      setIsNew(false);
    } else {
      await updateRelation(inputRelation);
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(content));
      Object.keys(obj).forEach((p: any) => {
        if (inputRelation.hasOwnProperty(p)) {
          obj[p] = inputRelation[p];
        }
      });
      setCurrentItem(obj);
    }

    if (handleUpdate) {
      handleUpdate(inputRelation);
    }

    setLoading(false);

    toast(`Conteúdo ${isNew ? "adicionado" : "atualizado"} com sucesso.`, {
      backgroundColor: "#263238",
      color: "#fff"
    });
  };

  const onClickItem = (e: any) => {
    const { action, index } = e;

    if (action === "IMAGES") {
      setModalSel(action);
      setShowModal(true);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-4 tabs">
        <a
          onClick={() => setTabSel(0)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 0 && "tab-active"
          }`}
        >
          Dados
        </a>
        <a
          onClick={() => setTabSel(1)}
          className={`cursor-pointer tab tab-lifted ${
            tabSel === 1 && "tab-active"
          }`}
        >
          Organização
        </a>
        {watchName && watchType && (
          <a
            onClick={() => setTabSel(2)}
            className={`tab tab-lifted ${tabSel === 2 && "tab-active"}`}
          >
            Conteúdos
          </a>
        )}
        {watchName && watchType && (
          <a
            onClick={() => setTabSel(3)}
            className={`tab tab-lifted ${tabSel === 3 && "tab-active"}`}
          >
            Agenda
          </a>
        )}
        {watchName && watchType && (
          <a
            onClick={() => setTabSel(5)}
            className={`tab tab-lifted ${tabSel === 5 && "tab-active"}`}
          >
            Moderação
          </a>
        )}
          <a
            onClick={() => setTabSel(6)}
            className={`tab tab-lifted ${tabSel === 6 && "tab-active"}`}
          >
            Integrações
          </a>
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>

      <div className="mt-5 mb-2 max-w-full w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {tabSel === 0 && (
            <div>
              <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                <div className="basis-full lg:basis-3/6">
                  <Input
                    label="Título do conteúdo restrito"
                    type="text"
                    aria-invalid={errors.name ? "true" : "false"}
                    register={register("name")}
                    defaultValue={""}
                    notes={
                      errors.name && errors.name.type === "required"
                        ? "Título é obrigatório."
                        : ""
                    }
                  />
                </div>
                {types.length > 0 && (
                  <div className="basis-full lg:basis-2/6">
                    <div className="flex -mx-3">
                      <div className="basis-full px-3">
                        <label
                          htmlFor=""
                          className="text-accent-7 text-sm font-semibold px-1"
                        >
                          Tipo
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10"></div>
                          <select
                            {...register("type")}
                            placeholder=""
                            aria-invalid={errors.type ? "true" : "false"}
                            className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                          >
                            <option value=""></option>
                            {types.map((i: any, k: number) => (
                              <option key={k} value={i.type}>
                                {i.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="basis-full lg:basis-1/6">
                  <div className="flex -mx-3">
                    <div className="basis-full px-3">
                      <label
                        htmlFor=""
                        className="text-accent-7 text-sm font-semibold px-1"
                      >
                        Status
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10"></div>
                        <select
                          {...register("status")}
                          placeholder=""
                          className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        >
                          <option value="rc-on">ON LINE</option>
                          <option value="rc-off">OFF LINE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="basis-full">
                  <label className="text-accent-7 text-sm font-semibold px-1">
                    Descrição
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <textarea
                          rows={2}
                          className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <span className="text-accent-6 text-xs"></span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="basis-full">
                  <Input
                    label="Referência"
                    type="text"
                    register={register("reference")}
                    defaultValue={""}
                    notes="Informação adicional para referência do conteúdo."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="basis-full">
                  <div className="flex flex-row-reverse w-full">
                    <div className="mt-6 pl-2">
                      <div
                        className="p-2 flex items-center rounded-lg hover:bg-accent-2 bg-accent-1 border-2 border-accent-2"
                        onClick={() => onClickItem({ action: "IMAGES" })}
                      >
                        <Picture className="flex-shrink-0 h-6 w-6 text-accent-7" />
                      </div>
                    </div>
                    <div className="w-full">
                      <Input
                        label="URL de uma imagem"
                        type="text"
                        register={register("avatar")}
                        defaultValue={""}
                        notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="certificatePerContent"
                    name="certificatePerContent"
                    checked={certificatePerContent}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="allowViewEmail" className="text-accent-9">
                    Emitir um certificado individual para cada conteúdo?
                  </label>
                </div>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
                <div className="basis-1/2">
                  <Input
                    label="Porcentagem de conclusão para certificado"
                    value={minimumPercentage}
                    onChange={setMinimumPercentage}
                    type="number"
                    placeholder=""
                  />
                </div>
                <div className="basis-1/2">
                  <Input
                    label="Total de Horas"
                    value={totalHours}
                    onChange={setTotalHours}
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          )}

          {tabSel === 1 && (
            <div>
              <Segment
                title="Organização do Conteúdo"
                notes="Opcionalmente você pode organizar e distribuir o conteúdo em grupos e subgrupos, e escolher a nomenclatura mais adequada, como módulos e seções, partes e etapas, etc."
              />

              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="max-w-full w-full mx-auto">
                    <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
                      <div className="basis-11/12">
                        <Input
                          label="Grupo"
                          type="text"
                          register={register(`groups.${index}.group` as const, {
                            required: true,
                          })}
                          defaultValue={""}
                          className={
                            errors?.groups?.[index]?.group ? "error" : ""
                          }
                        />
                      </div>
                      <div className="basis-1/12 pt-8">
                        <button type="button" onClick={() => remove(index)}>
                          <Trash />
                        </button>
                      </div>
                    </div>
                    <NestedArray nestIndex={index} {...{ control, register }} />
                  </div>
                );
              })}
              <div className="flex mt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() =>
                    append({
                      group: "",
                      subGroups: {} as any,
                    })
                  }
                >
                  <Plus2 />{" "}
                  <span className="ml-2">Adicionar Grupo / Módulo</span>
                </button>
              </div>
            </div>
          )}

          {(tabSel === 0 || tabSel === 1) && (
            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName || !watchType}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: "transparent", color: "#282a36" }}
                  onClick={() => {
                    router.push("/admin/restrictedcontent");
                  }}
                  className="ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !content && (
                <Button
                  style={{ backgroundColor: "transparent", color: "#282a36" }}
                  onClick={() => {
                    router.push("/admin/restrictedcontent");
                  }}
                  className="ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Conteúdos
                </Button>
              )}
            </div>
          )}
        </form>

        {tabSel === 2 && (
          <Contents
            relationID={contentID}
            name={watchName}
            groups={formGroups}
          />
        )}

        {tabSel === 3 && <Schedules relationID={contentID} userID={userID} />}

        {tabSel === 5 && <Moderation relationID={contentID} />}

        {tabSel === 6 && <TabIntegration relationID={contentID} />}
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        focusTrap={false}
        absolute={true}
      >
        <div
          style={{
            width: screenWidth * 0.8,
            height: modalSel === "IMAGES" ? screenHeight * 0.8 : "auto",
            maxHeight: screenHeight * 0.8,
          }}
        >
          {modalSel === "IMAGES" && (
            <div
              style={{ height: screenHeight * 0.78 }}
              className="overflow-y-auto"
            >
              <MidiasLib userID={userID} isModal={true} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export function NestedArray(props: any) {
  const { nestIndex, control, register } = props;

  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups[${nestIndex}].subGroups`,
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} className="max-w-full w-full mx-auto">
            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-1/12"></div>
              <div className="basis-10/12">
                <Input
                  label="Sub-Group"
                  type="text"
                  register={register(
                    `groups[${nestIndex}].subGroups[${k}].subGroup` as const,
                    {
                      required: true,
                    }
                  )}
                  defaultValue={""}
                />
              </div>
              <div className="basis-1/12 pt-8">
                <button type="button" onClick={() => remove(k)}>
                  <Trash />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
        <div className="basis-1/12"></div>
        <div className="basis-10/12">
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() =>
              append({
                subGroup: "",
              })
            }
          >
            <Plus2 /> <span className="ml-2">Adicionar Sub-grupo / Seção</span>
          </button>
        </div>
        <div className="basis-1/12"></div>
      </div>
    </div>
  );
}
