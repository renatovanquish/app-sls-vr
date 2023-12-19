import { useState, useEffect } from "react";
import { Button, Input } from "components/ui";
import { Check, Cross2, Undo } from "components/icons";
import { toast } from "react-toast";
import { useRouter } from "next/router";
import { useScreen } from "hooks/useScreen";
import { useQuiz } from "hooks/useQuiz";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import TabQuestions from "./TabQuestions";

type FormValues = {
  name: string;
  description: string;
  status: string;
};

const defaultValues = {
  name: "",
  description: "",
  status: "",
};

interface Props {
  userID: string;
  currentItem?: any;
  setCurrentItem?: any;
  handleUpdate?: any;
  index?: number;
}

export default function Form(props: any) {
  const { userID, currentItem, setCurrentItem, handleUpdate, index } = props;
  const [loading, setLoading] = useState(false);
  const [tabSel, setTabSel] = useState(0);
  const [quizID, setQuizID] = useState("");
  const [isNew, setIsNew] = useState(false);

  const [modalSel, setModalSel] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { screenWidth, screenHeight } = useScreen();
  const router = useRouter();
  const { createQuiz, updateQuiz } = useQuiz();

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

  useEffect(() => {
    reset(defaultValues);
    if (currentItem) {
      setIsNew(false);
      setQuizID(currentItem.id);
      setValue("name", currentItem.name);
      setValue("description", currentItem.description);
      setValue("status", currentItem.status);
    } else {
      setIsNew(true);
      setQuizID(uuidv4());
      setValue("name", "");
      setValue("description", "");
      setValue("status", "ON");
    }
  }, [currentItem, setValue]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    const { name, description, status } = data;
    const search = name.toLowerCase();

    const input = {
      id: quizID,
      name,
      description,
      status: status.toUpperCase(),
      search,
    } as any;

    if (isNew) {
      await createQuiz(input);
      setIsNew(false);
    } else {
      await updateQuiz(input);
    }

    if (setCurrentItem) {
      const obj = JSON.parse(JSON.stringify(currentItem));
      Object.keys(obj).forEach((p: any) => {
        if (input.hasOwnProperty(p)) {
          obj[p] = input[p];
        }
      });
      setCurrentItem(obj);
    }

    if (handleUpdate) {
      handleUpdate(input);
    }

    setLoading(false);

    toast(`Quiz ${isNew ? "adicionado" : "atualizado"} com sucesso.`, {
      backgroundColor: "#263238",
      color: "#fff",
    });
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
        {watchName && (
          <a
            onClick={() => setTabSel(1)}
            className={`tab tab-lifted ${tabSel === 1 && "tab-active"}`}
          >
            Questões
          </a>
        )}
        <div className="flex-1 cursor-default tab tab-lifted"></div>
      </div>

      {tabSel === 0 && (
        <div className="mt-5 mb-2 max-w-full w-full mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-full lg:basis-4/6">
                <Input
                  label="Título do quiz"
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
              <div className="basis-full lg:basis-2/6">
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
                        <option value="ON">ON LINE</option>
                        <option value="OFF">OFF LINE</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
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
            <div className="mt-6">
              <Button
                variant="slim"
                type="submit"
                loading={loading}
                disabled={!watchName}
              >
                <Check className="-ml-2 mr-2" />
                {isNew && <span>Adicionar</span>}
                {!isNew && <span>Atualizar</span>}
              </Button>
              {isNew && (
                <Button
                  style={{ backgroundColor: "transparent", color: "#282a36" }}
                  onClick={() => {
                    router.push("/admin/quiz");
                  }}
                  className="ml-2"
                  variant="slim"
                  type="button"
                >
                  <Cross2 className="-ml-2 mr-2" />
                  Cancelar
                </Button>
              )}
              {!isNew && !currentItem && (
                <Button
                  style={{ backgroundColor: "transparent", color: "#282a36" }}
                  onClick={() => {
                    router.push("/admin/quiz");
                  }}
                  className="ml-2"
                  variant="slim"
                  type="button"
                >
                  <Undo className="-ml-2 mr-2" />
                  Lista Quiz
                </Button>
              )}
            </div>
          </form>
        </div>
      )}

      {tabSel === 1 && <TabQuestions quizID={quizID} name={currentItem.name} userID={userID} />}
    </div>
  );
}
