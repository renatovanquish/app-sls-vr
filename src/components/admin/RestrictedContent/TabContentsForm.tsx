import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";

import * as customQueries from "graphql/custom-queries";
import * as queries from "graphql/queries";
import * as mutations from "graphql/mutations";

import React, { useCallback, useState, useEffect } from "react";
import { Button, Input, Segment } from "components/ui";
import { Check, Trash } from "components/icons";
import { toast } from "react-toast";
import { useRestrictedContent } from "hooks/useRestrictedContent";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useUI } from "components/ui/context";
import { v4 as uuidv4 } from "uuid";
import { RestrictedContentTypes } from "API";
import { useBreakPoints } from "hooks/useBreakPoints";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";

import Moment from "moment";

import { useDropzone } from "react-dropzone";
import { Auth } from "aws-amplify";
import { Storage } from "aws-amplify";

import awsExports from "../../../aws-exports";
import awsvideoconfig from "../../../aws-video-exports";

import { useSignedUrl } from "hooks/useSignedUrl";

Storage.configure({
  AWSS3: {
    bucket: awsvideoconfig.awsInputVideo,
    region: awsExports.aws_user_files_s3_bucket_region,
    customPrefix: {
      public: "",
    },
  },
});

type Inputs = {
  type: string;
  group: string;
  subGroup: string;
  order: number;
  title: string;
  description: string;
  notes: string;
  lifetime: string;
  start: any;
  expiration: any;
};

interface Props {
  relationID: string;
  item: any;
  onCloseModal: any;
  groups: any[];
}

export default function ContentsForm(props: any) {
  const { relationID, item, onCloseModal, groups } = props;
  const [loadingItem, setLoadingItem] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [tabSel, setTabSel] = useState(0);
  const [contentID, setContentID] = useState("");

  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState(false as any);

  const [extra, setExtra] = useState([] as any);

  const [vimeoCode, setVimeoCode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const watchTitle = watch("title");
  const watchType = watch("type");
  const watchGroup = watch("group");
  const watchSubGroup = watch("subGroup");
  const watchLifetime = watch("lifetime");

  const { createRestrictedContent, updateRestrictedContent } =
    useRestrictedContent();

  const fetchExtras = async () => {
    setExtra([] as any);
    const items = await Storage.list(`restricted/${item.id}/extra/`, {
      level: "protected",
      identityId: item.identityId,
    });
    const { files } = processStorageList(items);
    setExtra(files);
  };

  useEffect(() => {
    if (item && item.id) {
      setIsNew(false);

      const contentParse = item.content
        ? JSON.parse(item.content)
        : (false as any);
      setContent(contentParse);

      if (contentParse && contentParse[0] && contentParse[0].vimeo) {
        setVimeoCode(contentParse[0].vimeo);
      }

      // console.log(contentParse[0].vimeo)

      setThumbnail(item.thumbnail);
      setContentID(item.id);
      setValue("type", item.type);
      setValue("group", item.group ? item.group : "");
      setValue("subGroup", item.subGroup ? item.subGroup : "");
      setValue("order", item.order);
      setValue("title", item.title);
      setValue("notes", item.notes);
      setValue("description", item.description);
      setValue("lifetime", item.lifetime ? item.lifetime : "PROGRAMMED");
      setValue(
        "start",
        item.lifetime === "PERIOD" && item.start
          ? Moment(item.start).format("YYYY-MM-DD")
          : item.start
      );
      setValue(
        "expiration",
        item.lifetime === "PERIOD" && item.expiration
          ? Moment(item.expiration).format("YYYY-MM-DD")
          : item.expiration
      );

      fetchExtras();
    } else {
      setIsNew(true);
      setContent(false);
      setThumbnail("");
      setContentID(uuidv4());
      setValue("group", "");
      setValue("subGroup", "");
      setValue("order", Math.round(new Date().getTime() / 1000));
      setValue("lifetime", "PROGRAMMED");
      setValue("start", 0);
      setValue("expiration", 365);
    }
  }, [item, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      type,
      group,
      subGroup,
      order,
      title,
      description,
      start,
      expiration,
      notes,
      lifetime,
    } = data;

    setLoadingItem(true);

    const credential = await Auth.currentCredentials();
    const identityId = credential.identityId;

    console.log("content", content);
    console.log("data", data);
    console.log("vimeoCode", vimeoCode);

    let contentFMT = ""; // JSON.stringify(content)

    if (vimeoCode) {
      if (content && content[0]) {
        content[0].vimeo = vimeoCode;
        setContent(content);
        contentFMT = JSON.stringify(content);
      } else {
        const c = [] as any;
        c.push({ vimeo: vimeoCode });
        setContent(c);
        contentFMT = JSON.stringify(c);
      }
    } else {
      contentFMT = JSON.stringify(content)
    }


    const input = {
      id: contentID,
      relationID,
      type,
      group,
      subGroup,
      order,
      title,
      description,
      notes,
      identityId,
      content: contentFMT,
      thumbnail,
      lifetime,
      start: lifetime === "PERIOD" ? Moment(start).format("YYYY-MM-DD") : start,
      expiration:
        lifetime === "PERIOD"
          ? Moment(expiration).format("YYYY-MM-DD")
          : expiration,
      search: title.toLowerCase(),
    } as any;

    if (isNew) {
      await createRestrictedContent(input);
      setIsNew(false);
    } else {
      await updateRestrictedContent(input);
    }

    setLoadingItem(false);
  };

  const { setProgress } = useUI();
  const { SignedUrl } = useSignedUrl();

  const onDrop = useCallback(
    async (acceptedFiles: any[], contentID: any, isAWSVDO: any) => {
      toast("Upload do vídeo iniciado.", {
        backgroundColor: "#263238",
        color: "#fff",
      });

      const files: {
        id?: string;
        key: any;
        size: any;
        type: any;
        isAWSVDO?: boolean;
      }[] = [];

      let countUpload = 0;
      acceptedFiles.map(async (file: any) => {
        const extension = file.name.split(".").pop();

        if (isAWSVDO) {
          /*
        Storage.configure({
          AWSS3: {
              bucket: awsvideoconfig.awsInputVideo,
              region: awsExports.aws_user_files_s3_bucket_region,
              customPrefix: {
                public: '',
              }
            },
          });
        */

          console.log(contentID);
          const uuid = uuidv4();
          const key = `${uuid}.${extension}`;
          console.log(key);

          const videoObject = {
            input: {
              id: uuid,
            },
          };

          const createdVideoObject = true; // await API.graphql(graphqlOperation(mutations.createVideoObject, videoObject))
          //  console.log(createdVideoObject)

          if (createdVideoObject) {
            /*
            const uploaded = await Storage.put(key, file, {
              resumable: true,
              contentType: 'video/*',
              completeCallback: (event) => {
                console.log(`Successfully uploaded ${event}`)
              },
              progressCallback: (progress: any) => {
                const { loaded, total } = progress
                const p = ((loaded / total) * 100).toFixed(0)
                console.log('Video', p)
                setProgress(p)
              },
              errorCallback: (err) => {
                console.error('Unexpected error while uploading', err)
              },
            })
            console.log(uploaded)
            */

            const presigned = await SignedUrl({
              id: uuid,
              key,
              bucket: awsvideoconfig.awsInputVideo,
              region: awsExports.aws_user_files_s3_bucket_region,
              action: "createPresignedPost",
              contentType: "video/*",
            });

            const presignedUrl = JSON.parse(
              presigned.SignedUrl.substring(
                presigned.SignedUrl.indexOf('{"url"'),
                presigned.SignedUrl.length
              ).replace("}}", "")
            );

            console.log("presigned", presigned);
            console.log("presignedUrl", presignedUrl);

            const uploadFileToS3 = (presignedPostData: any, file: any) => {
              return new Promise<void>((resolve, reject) => {
                const formData = new FormData();
                Object.keys(presignedPostData.fields).forEach((key) => {
                  formData.append(key, presignedPostData.fields[key]);
                });
                formData.append("file", file);
                const xhr = new XMLHttpRequest();
                xhr.open("POST", presignedPostData.url, true);
                xhr.upload.onprogress = (e: any) => {
                  if (e.lengthComputable) {
                    const p = ((e.loaded / e.total) * 100) | 0;
                    setProgress(p);
                  }
                };
                xhr.send(formData);
                xhr.onload = function () {
                  this.status === 204 ? resolve() : reject(this.responseText);
                };
              });
            };

            await uploadFileToS3(presignedUrl, file);
          }

          files.push({
            id: uuid,
            key,
            size: file.size,
            type: file.type,
            isAWSVDO: true,
          });
        } else {
          Storage.configure({ level: "protected" });
          const key = `restricted/${contentID}/main/${uuidv4()}.${extension}`;
          files.push({
            key,
            size: file.size,
            type: file.type,
          });
          const uploaded = await Storage.put(key, file, {
            resumable: true,
            contentType: "video/*",
            completeCallback: (event) => {
              console.log(`Successfully uploaded ${event}`);
            },
            progressCallback: (progress: any) => {
              const { loaded, total } = progress;
              const p = ((loaded / total) * 100).toFixed(0);
              console.log("Video", p);
              setProgress(p);
            },
            errorCallback: (err) => {
              console.error("Unexpected error while uploading", err);
            },
          });
        }

        countUpload++;

        if (countUpload == acceptedFiles.length) {
          if (files.length > 0) {
            setContent(files);
          }

          toast.hideAll();
          toast("Upload do vídeo finalizado.", {
            backgroundColor: "#263238",
            color: "#fff",
          });
        }
      });
    },
    []
  );

  const onDropThumbnail = useCallback(
    async (acceptedFiles: any[], contentID: any) => {
      const file = acceptedFiles[0];
      const contentType = file ? file.type : false;

      if (contentType && contentType.split("/")[0] === "image") {
        const extension = file.name.split(".").pop();
        const key = `restricted/${contentID}/thumb.${extension}`;

        toast("Upload do thumbnail iniciado.", {
          backgroundColor: "#263238",
          color: "#fff",
        });

        setThumbnail(key);

        Storage.configure({
          level: "protected",
          AWSS3: {
            bucket: awsExports.aws_user_files_s3_bucket,
            region: awsExports.aws_user_files_s3_bucket_region,
            customPrefix: {
              public: "",
            },
          },
        });

        await Storage.put(key, file, {
          level: "protected",
          contentType: `${file.type}`,
          progressCallback(progress: { loaded: any; total: any }) {
            const { loaded, total } = progress;
            const p = ((loaded / total) * 100).toFixed(0);
            setProgress(p);
          },
        });

        toast.hideAll();
        toast("Upload do thumbnail finalizado.", {
          backgroundColor: "#263238",
          color: "#fff",
        });
      } else {
        toast.error("Tipo do arquivo inválido, deve ser uma imagem.");
      }
    },
    []
  );

  const onDropExtra = useCallback(
    async (acceptedFiles: any[], contentID: any) => {
      toast("Upload iniciado.", {
        backgroundColor: "#263238",
        color: "#fff",
      });

      const files: { key: any; size: any; type: any }[] = [];
      let countUpload = 0;
      acceptedFiles.map(async (file: any) => {
        const key = `restricted/${contentID}/extra/${file.name}`;

        files.push({
          key,
          size: file.size,
          type: file.type,
        });

        await Storage.put(key, file, {
          level: "protected",
          contentType: `${file.type}`,
          progressCallback(progress: { loaded: any; total: any }) {
            const { loaded, total } = progress;
            const p = ((loaded / total) * 100).toFixed(0);
            setProgress(p);
          },
        });

        countUpload++;

        if (countUpload == acceptedFiles.length) {
          fetchExtras();
          toast.hideAll();
          toast("Upload finalizado.", {
            backgroundColor: "#263238",
            color: "#fff",
          });
        }
      });
    },
    []
  );

  const deleteExtra = async (key: string, identityId: string) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir? ${key}`,
      options: [
        {
          title: "NÃO",
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: "SIM",
        },
      ],
    });
    if (promptRet.index === 1) {
      await Storage.remove(key, {
        level: "protected",
      });
      // remove item deleted in extra
      setExtra(extra.filter((item: any) => item.key !== key));
      toast.hideAll();
      toast("Arquivo excluído com sucesso.", {
        backgroundColor: "#263238",
        color: "#fff",
      });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 tabs">
          <a
            onClick={() => setTabSel(0)}
            className={`cursor-pointer tab tab-lifted ${
              tabSel === 0 && "tab-active"
            }`}
          >
            Dados
          </a>
          {watchType && (
            <a
              onClick={() => setTabSel(1)}
              className={`tab tab-lifted ${tabSel === 1 && "tab-active"}`}
            >
              Upload
            </a>
          )}
          {watchType && (
            <a
              onClick={() => setTabSel(2)}
              className={`tab tab-lifted ${tabSel === 2 && "tab-active"}`}
            >
              Extra
            </a>
          )}
          <div className="flex-1 cursor-default tab tab-lifted"></div>
        </div>

        {tabSel === 0 && (
          <div className="mt-4">
            <Segment
              title="IDENTIFICAÇÃO DO CONTEÚDO"
              notes="Informe o título que for mais adequado ao conteúdo dependendo do seu tipo, como por exemplo: Caso o tipo seja PDFs, o título pode ser o nome do arquivo ou do tema dos arquivos, caso o tipo seja um vídeo o título pode ser o tema do vídeo ou a identificação da aula."
            />

            <div className="mt-4 flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
              <div className="basis-full md:basis-2/3">
                <Input
                  label="Título"
                  type="text"
                  aria-invalid={errors.title ? "true" : "false"}
                  register={register("title")}
                  defaultValue={""}
                  notes={
                    errors.title && errors.title.type === "required"
                      ? "Título é obrigatório."
                      : ""
                  }
                />
              </div>
              <div className="basis-full md:basis-1/3">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
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
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value=""></option>
                        <option value={RestrictedContentTypes.VIDEO}>
                          Vídeo
                        </option>
                        <option value={RestrictedContentTypes.AUDIO}>
                          Audio
                        </option>
                        <option value={RestrictedContentTypes.PDF}>PDF</option>
                        <option value={RestrictedContentTypes.IMAGE}>
                          Imagem
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Segment
              className="mt-6"
              title="ORGANIZAÇÃO E ORDEM DE EXIBIÇÃO"
              notes="Selecione o Grupo e Subgrupo que o conteúdo pertence, e a ordem de exibição."
            />

            <div className="flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
              <div className="basis-full md:basis-2/5">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Grupo
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register("group")}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="">Nenhum</option>
                        {groups.map((g: any, k: number) => (
                          <option key={k} value={g.group}>
                            {g.group}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-full md:basis-2/5">
                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Sub-grupo
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register("subGroup")}
                        value={watchSubGroup}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="">Nenhum</option>
                        {groups.map((g: any) => {
                          if (g.group == watchGroup) {
                            return g.subGroups.map((sg: any, sgk: number) => (
                              <option key={sgk} value={sg.subGroup}>
                                {sg.subGroup}
                              </option>
                            ));
                          }
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="basis-full md:basis-1/5">
                <Input
                  label="Ordem"
                  type="text"
                  aria-invalid={errors.order ? "true" : "false"}
                  register={register("order")}
                  defaultValue={""}
                  notes={
                    errors.order && errors.order.type === "required"
                      ? "Ordem é obrigatório."
                      : ""
                  }
                />
              </div>
            </div>

            <Segment
              className="mt-6"
              title="DISPONIBILIDADE DE ACESSO"
              notes="Defina quando e por quanto tempo esse conteúdo estará disponível para os usuários com acesso."
            />

            <div className="flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
              <div className="basis-full md:basis-1/3">
                <div className="flex -mx-3">
                  <div className="basis-full px-3">
                    <label
                      htmlFor=""
                      className="text-accent-7 text-sm font-semibold px-1"
                    >
                      Disponibilidade
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10"></div>
                      <select
                        {...register("lifetime")}
                        placeholder=""
                        className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                      >
                        <option value="PROGRAMMED">
                          Programado a partir da compra
                        </option>
                        <option value="PERIOD">Em um período de datas</option>
                        <option value="FOREVER">Vitalício</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {(!watchLifetime || watchLifetime === "PERIOD") && (
                <div className="basis-full md:basis-1/3">
                  <Input
                    label="Data da liberação"
                    type="date"
                    register={register("start")}
                    defaultValue={""}
                  />
                </div>
              )}
              {(!watchLifetime || watchLifetime === "PERIOD") && (
                <div className="basis-full md:basis-1/3">
                  <Input
                    label="Data de expiração"
                    type="date"
                    register={register("expiration")}
                    defaultValue={""}
                  />
                </div>
              )}
              {(!watchLifetime || watchLifetime === "PROGRAMMED") && (
                <div className="basis-full md:basis-1/3">
                  <Input
                    label="Liberado X dias após a compra"
                    type="number"
                    register={register("start")}
                    defaultValue={""}
                    notes="Informe a qtde de dias."
                  />
                </div>
              )}
              {(!watchLifetime || watchLifetime === "PROGRAMMED") && (
                <div className="basis-full md:basis-1/3">
                  <Input
                    label="Expirado X dias após a compra"
                    type="number"
                    register={register("expiration")}
                    defaultValue={""}
                    notes="Informe a qtde de dias."
                  />
                </div>
              )}
            </div>

            <Segment
              className="mt-6"
              title="INFORMAÇÕES DO CONTEÚDO"
              notes="Entre com as informações do conteúdo."
            />

            <div className="mt-4 flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
              <div className="basis-full">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Descrição do conteúdo
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <textarea
                        rows={3}
                        className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        value={value ? value : ""}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <span className="text-accent-6 text-xs"></span>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
              <div className="basis-full">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Observações
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <textarea
                        rows={3}
                        className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        value={value ? value : ""}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <span className="text-accent-6 text-xs">
                  Informações adicionais, como responsável, autor, etc.
                </span>
              </div>
            </div>
          </div>
        )}

        {tabSel === 1 && (
          <div className="mt-4">
            <Segment
              title={`INSTRUÇÕES PARA O UPLOAD DO TIPO ${
                watchType === RestrictedContentTypes.VIDEO
                  ? "VÍDEO"
                  : watchType === RestrictedContentTypes.AUDIO
                  ? "AUDIO"
                  : watchType === RestrictedContentTypes.PDF
                  ? "PDF"
                  : "IMAGEM"
              }`}
              description="Conteúdo Principal"
              notes={`${
                watchType === RestrictedContentTypes.VIDEO
                  ? "O upload deve ser um único arquivo de vídeo no formato mp4."
                  : watchType === RestrictedContentTypes.AUDIO
                  ? "O upload deve ser um único arquivo de audio no formato mp3 ou mp4."
                  : watchType === RestrictedContentTypes.PDF
                  ? "O upload pode ser um ou mais arquivos pdf."
                  : "O upload pode ser um ou mais arquivos de imagens preferencialmente no formato png ou jpg."
              }`}
            />

            <MainDropzone
              watchType={watchType}
              onDrop={onDrop}
              contentID={contentID}
            />
            
            <Segment
              className="mt-6"
              title="Thumbnail"
              notes="Opcionalmente faça o upload de um thumbnail para o conteúdo principal."
            />

            <ThumbnailDropzone
              watchType={watchType}
              onDrop={onDropThumbnail}
              contentID={contentID}
            />
            <div className="text-sm">{thumbnail}</div>

            {watchType === RestrictedContentTypes.VIDEO && (
              <div>
                <Segment
                  className="mt-6"
                  title="Vimeo"
                  notes="Opcionalmente você pode carregar este vídeo do Vimeo. Caso informe o código ele será o padrão para a exibição."
                />

                <div style={{ width: 300 }}>
                  <Input
                    label="Código do vídeo no Vimeo"
                    value={vimeoCode}
                    onChange={setVimeoCode}
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {tabSel === 2 && (
          <div>
            <Segment
              className="mt-4"
              title="Conteúdo extra"
              description="Material de apoio (PDFs)"
              notes="Opcionalmente para cada conteúdo você pode associar um ou mais arquivos PDFs, estes arquivos podem ser utilizados pelo usuário como apostilas, ebooks, material de apoio, etc."
            />

            <ExtraDropzone
              watchType={watchType}
              onDrop={onDropExtra}
              contentID={contentID}
            />

            <div className="mt-4 flex flex-col gap-2">
              {extra.map((f: any, n: number) => (
                <button
                  onClick={() => {
                    deleteExtra(f.key, item.identityId);
                  }}
                  key={n}
                  className="btn btn-outline gap-2"
                >
                  {f.key.split("/").pop()}
                  <Trash />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Button
            variant="slim"
            type="submit"
            loading={loadingItem}
            disabled={
              !watchTitle ||
              !watchType ||
              (!content && !vimeoCode) ||
              (content && content.length === 0)
            }
          >
            <Check className="-ml-2 mr-2" />
            {!item && <span>Adicionar</span>}
            {item && <span>Atualizar</span>}
          </Button>
        </div>
      </form>
    </div>
  );
}

function MainDropzone(props: any) {
  const { watchType, onDrop, contentID } = props;
  const { isSm } = useBreakPoints();
  const [isAWSVDO, setIsAWSVDO] = useState(true);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept:
      watchType === RestrictedContentTypes.VIDEO
        ? { "video/*": [] }
        : watchType === RestrictedContentTypes.AUDIO
        ? { "audio/*": [] }
        : watchType === RestrictedContentTypes.PDF
        ? { "application/pdf": [] }
        : { "image/*": [] },
    onDrop: (droppedFiles) => onDrop(droppedFiles, contentID, isAWSVDO),
  });

  const handleCheckboxChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (target.name === "isAWSVDO") {
      setIsAWSVDO(value);
    }
  };

  return (
    <div>
      {watchType === RestrictedContentTypes.VIDEO && (
        <div className="mt-2 flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="isAWSVDO"
              name="isAWSVDO"
              checked={isAWSVDO}
              onChange={handleCheckboxChange}
              className="checkbox"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="allowViewEmail" className="text-sm text-accent-9">
              Utilizar VDO da AWS - Video on Demand?
            </label>
          </div>
        </div>
      )}
      <div
        {...getRootProps()}
        className="text-tertiary-2 bg-accent-1 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent-3 border-dashed rounded-md cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte o arquivo aqui ...</p>
        ) : isSm ? (
          <p>Toque aqui para selecionar...</p>
        ) : (
          <p>
            Arraste e solte{" "}
            {watchType === RestrictedContentTypes.VIDEO && "o vídeo"}
            {watchType === RestrictedContentTypes.AUDIO && "o audio"}
            {watchType === RestrictedContentTypes.PDF && "o(s) PDF(s)"}
            {watchType === RestrictedContentTypes.IMAGE &&
              "a imagem ou imagens"}{" "}
            aqui ou clique para selecionar ...
          </p>
        )}
      </div>
    </div>
  );
}

function ThumbnailDropzone(props: any) {
  const { watchType, onDrop, contentID } = props;
  const { isSm } = useBreakPoints();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (droppedFiles) => onDrop(droppedFiles, contentID),
  });

  return (
    <div
      {...getRootProps()}
      className="text-tertiary-2 bg-accent-1 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent-3 border-dashed rounded-md cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte o arquivo aqui ...</p>
      ) : isSm ? (
        <p>Toque aqui para selecionar...</p>
      ) : (
        <p>Arraste e solte a imagem aqui ou clique para selecionar ...</p>
      )}
    </div>
  );
}

function ExtraDropzone(props: any) {
  const { watchType, onDrop, contentID } = props;
  const { isSm } = useBreakPoints();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: (droppedFiles) => onDrop(droppedFiles, contentID),
  });

  return (
    <div
      {...getRootProps()}
      className="text-tertiary-2 bg-accent-1 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-accent-3 border-dashed rounded-md cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte o arquivo aqui ...</p>
      ) : isSm ? (
        <p>Toque aqui para selecionar...</p>
      ) : (
        <p>Arraste e solte o(s) PDF(s) aqui ou clique para selecionar ...</p>
      )}
    </div>
  );
}

function processStorageList(result: any) {
  const files: any[] = [];
  const folders: any[] = [];
  result.forEach((res: any) => {
    if (res.size) {
      files.push(res);
      const possibleFolder = res.key.split("/").slice(0, -1).join("/");
      if (possibleFolder && folders.indexOf(possibleFolder) === -1) {
        folders.push(possibleFolder);
      }
    } else {
      folders.push(res.key);
    }
  });
  return { files, folders };
}
