import { useState, useEffect } from "react";
import { Button, Input, Modal } from "components/ui";
import { Check, Trash, Picture } from "components/icons";
import { toast } from "react-toast";
import { useQuiz } from "hooks/useQuiz";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useUI } from "components/ui/context";
import { v4 as uuidv4 } from "uuid";
import { useBreakPoints } from "hooks/useBreakPoints";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { MidiasLib } from "components/admin";
import { useScreen } from "hooks/useScreen";

type Inputs = {
  question: string;
  image: string;
  alternativeA: string;
  alternativeB: string;
  alternativeC: string;
  alternativeD: string;
  alternativeE: string;
  alternativeCorrect: string;
  order: number;
};

interface Props {
  quizID: string;
  questionSel: any;
  onCloseModal: any;
  userID: string
}

export default function QuestionForm(props: any) {
  const { quizID, questionSel, onCloseModal, userID } = props;
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [questionID, setQuestionID] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const watchQuestion = watch("question");
  const watchAlternativeA = watch("alternativeA");
  const watchAlternativeB = watch("alternativeB");
  const watchAlternativeCorrect = watch("alternativeCorrect");

  const { createQuizQuestion, updateQuizQuestion } = useQuiz();

  useEffect(() => {
    if (questionSel && questionSel.id) {
      setIsNew(false);
      setQuestionID(questionSel.id);

      setValue("question", questionSel.question);
      setValue("image", questionSel.image);
      setValue("alternativeA", questionSel.alternativeA);
      setValue("alternativeB", questionSel.alternativeB);
      setValue("alternativeC", questionSel.alternativeC);
      setValue("alternativeD", questionSel.alternativeD);
      setValue("alternativeE", questionSel.alternativeE);
      setValue("alternativeCorrect", questionSel.alternativeCorrect);
      setValue("order", questionSel.order);
    } else {
      setIsNew(true);
      setQuestionID('');
    }
  }, [questionSel, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {
      question,
      image,
      alternativeA,
      alternativeB,
      alternativeC,
      alternativeD,
      alternativeE,
      alternativeCorrect,
      order,
    } = data;

    setLoading(true);

    const input = {
      id: questionID ? questionID : uuidv4(),
      quizID,
      question,
      image,
      alternativeA,
      alternativeB,
      alternativeC,
      alternativeD,
      alternativeE,
      alternativeCorrect,
      order: order ? order : Math.round(new Date().getTime() / 1000),
      search: question.toLowerCase(),
    } as any;

    if (isNew) {
      await createQuizQuestion(input);
      setIsNew(false);
      setQuestionID(input.id);
    } else {
      await updateQuizQuestion(input);
    }

    setLoading(false);
  };

  const [modalSel, setModalSel] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { screenWidth, screenHeight } = useScreen();

  const onClickItem = (e: any) => {
    const { action, index } = e;

    if (action === "IMAGES") {
      setModalSel(action);
      setShowModal(true);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
          <div className="basis-full">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Questão
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="question"
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
                  register={register("image")}
                  defaultValue={""}
                  notes="Pesquise e clique sobre uma das imagens da galeria e cole aqui."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row w-full md:space-x-2 space-y-3 md:space-y-0 mb-2 md:mb-4">
          <div className="basis-full">
            <label className="text-accent-7 text-sm font-semibold px-1">
              Alternativa (A)
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="alternativeA"
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
              Alternativa (B)
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="alternativeB"
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
              Alternativa (C)
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="alternativeC"
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
              Alternativa (D)
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="alternativeD"
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
              Alternativa (E)
            </label>
            <div className="flex">
              <div className="w-10 z-10"></div>
              <Controller
                name="alternativeE"
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
          <div className="basis-full md:basis-4/6">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Alternativa correta
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register("alternativeCorrect")}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value=""></option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="N">Nenhuma</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-2/6">
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
        <div className="mt-6">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={
              !watchQuestion ||
              !watchAlternativeA ||
              !watchAlternativeB ||
              !watchAlternativeCorrect
            }
          >
            <Check className="-ml-2 mr-2" />
            {!questionID && <span>Adicionar</span>}
            {questionID && <span>Atualizar</span>}
          </Button>
        </div>
      </form>

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
