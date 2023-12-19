/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Search } from "components/icons";
import cn from "classnames";
import Image from "next/image";

interface Props {
  block: any;
  user: any;
}

export default function View(props: Props) {
  const { block, user } = props;
  const [content, setContent] = useState({} as any);
  const [config, setConfig] = useState({} as any);
  const router = useRouter();

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config);
      setConfig(configParse);
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content);
      setContent(contentParse);
    }
    return () => {
      setConfig({} as any);
      setContent({} as any);
    };
  }, [block]);

  return (
    <div
      className={cn({
        ["hidden"]: config.view === "hide" || (config.view === "guest" && user),
        ["md:hidden"]: config.view === "sm",
        ["hidden md:block"]: config.view === "lg",
        ["px-0"]: config.padX && config.padX === "none",
        ["px-4"]: !config.padX || config.padX === "small",
        ["px-8"]: config.padX && config.padX === "normal",
        ["px-12"]: config.padX && config.padX === "large",
        ["px-24"]: config.padX && config.padX === "extra",
        ["py-0"]: config.padY && config.padY === "none",
        ["py-4"]: !config.padY || config.padY === "small",
        ["py-8"]: config.padY && config.padY === "normal",
        ["py-12"]: config.padY && config.padY === "large",
        ["py-24"]: config.padY && config.padY === "extra",
        ["bg-accent-1"]: config.bgMode === "auto",
        ["bg-local"]: config.bgMode === "image",
      })}
      style={{
        backgroundColor:
          config.bgMode === "custom" && config.bgColor ? config.bgColor : null,
        backgroundImage:
          config.bgMode === "image" ? `url(${config.bgImage})` : "",
        backgroundRepeat: config.bgMode === "image" ? "no-repeat" : "",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {config.anchor && <a id={`${config.anchor}`}></a>}
      <div
        className={cn("w-full", {
          ["text-left"]: content.align === "left",
          ["text-center"]: content.align === "center",
          ["text-right"]: content.align === "right",
        })}
      >
        {content.title && (
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-accent-9 mb-4">
            {content.title}
          </h1>
        )}
        {content.description && (
          <p
            className={cn(
              "inline text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-accent-7",
              {
                ["mx-auto"]: content.align === "center",
                ["text-right"]: content.align === "right",
              }
            )}
          >
            {content.description}
          </p>
        )}
        {content.showBar === "show" && (
          <div
            className={cn("flex mt-6", {
              ["justify-start"]: content.align === "left",
              ["justify-center"]: content.align === "center",
              ["justify-end"]: content.align === "right",
            })}
          >
            <div className="w-16 h-1 rounded-full bg-tertiary-2 inline-flex"></div>
          </div>
        )}

        <QuizPage user={user} />
      </div>
    </div>
  );
}

import { useQuiz } from "hooks/useQuiz";
import { QuizStatus } from "API";
import { RightArrow, Cross } from "components/icons";
import { useBreakPoints } from "hooks/useBreakPoints";
import { Loading } from "components/ui";

export const QuizPage = (props: any) => {
  const { user } = props;
  const [quizItems, setQuizItems] = useState([] as any);
  const [quiz, setQuiz] = useState({} as any);
  const [quizExist, setQuizExist] = useState(false);
  const [questions, setQuestions] = useState([] as any);
  const [question, setQuestion] = useState({} as any);
  const [questionExist, setQuestionExist] = useState(false);
  const [optionSel, setOptionSel] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);

  const { isSm } = useBreakPoints();

  const { listQuizByStatus, listQuestionsByQuiz } = useQuiz();

  useEffect(() => {
    const fetchData = async () => {
      const { items } = await listQuizByStatus({
        status: QuizStatus.ON,
        limit: 1000,
      });
      setQuizItems(items);
    };
    fetchData();
    return () => {
      setQuizItems([] as any);
      setQuiz({} as any);
      setQuizExist(false);
      setQuestions([] as any);
      setQuestion({} as any);
      setQuestionExist(false);
      setOptionSel("");
      setIsCorrect(false);
    };
  }, []);

  const startQuiz = async (item: any) => {
    setOptionSel("");
    setIsCorrect(false);
    setQuestionNum(0);

    if (item && item.id) {
      setLoading(true);
      setQuiz(item);
      setQuizExist(true);

      const { items } = await listQuestionsByQuiz({
        quizID: item.id,
        limit: 1000,
      });

      setLoading(false);

      if (items.length > 0) {
        setQuestions(items);
        setQuestion(items[0]);
        setQuestionExist(true);
      } else {
        setQuestions([] as any);
        setQuestion({} as any);
        setQuestionExist(false);
      }
    } else {
      setQuiz({} as any);
      setQuizExist(false);
      setQuestions([] as any);
      setQuestion({} as any);
      setQuestionExist(false);
    }
  };

  const CloseQuiz = () => {
    setQuiz({} as any);
    setQuizExist(false);
    setQuestions([] as any);
    setQuestion({} as any);
    setQuestionExist(false);
  };

  const handleResult = (opt: any) => {
    setOptionSel(opt);
    setIsCorrect(question.alternativeCorrect === opt);
  };

  return (
    <div className="mt-4">
      {quizItems.length === 0 && (
        <div className="p-4 bg-accent-1 text-accent-7 font-semibold rounded-lg">
          Nenhum quiz localizado.
        </div>
      )}

      {!quizExist &&
        quizItems.length > 0 &&
        quizItems.map((item: any) => (
          <div key={item.id} className="my-2 p-4 bg-accent-1 rounded-lg">
            <div className="flex justify-between gap-4">
              <div>
                <div className="text-lg text-accent-7 font-semibold">
                  {item.name}
                </div>
                {item.description && (
                  <div className="text-sm text-accent-6">
                    {item.description}
                  </div>
                )}
              </div>
              <div onClick={() => startQuiz(item)} className="btn">
                Iniciar <RightArrow className="ml-2" />
              </div>
            </div>
          </div>
        ))}

      {quizExist && (
        <div>
          <div className="my-2 p-4 bg-accent-1 rounded-lg">
            <div className="flex justify-between items-center gap-4">
              <div>
                <div className="text-xl lg:text-3xl font-bold text-accent-9">
                  {quiz.name}
                </div>
                {!loading && (
                  <div>
                    {questionNum + 1}/{questions.length}
                  </div>
                )}
              </div>
              {!loading && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      CloseQuiz();
                    }}
                    className="btn btn-warning"
                  >
                    <Cross />
                  </button>
                  <button
                    disabled={!questions[questionNum - 1]}
                    onClick={() => {
                      if (questions[questionNum - 1]) {
                        setQuestionNum(questionNum - 1);
                        setQuestion(questions[questionNum - 1]);
                        setQuestionExist(true);
                        setIsCorrect(false);
                        setOptionSel("");
                      }
                    }}
                    className="btn"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    disabled={!questions[questionNum + 1]}
                    onClick={() => {
                      if (questions[questionNum + 1]) {
                        setQuestionNum(questionNum + 1);
                        setQuestion(questions[questionNum + 1]);
                        setQuestionExist(true);
                        setIsCorrect(false);
                        setOptionSel("");
                      }
                    }}
                    className="btn"
                  >
                    <RightArrow />
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading && <Loading />}

          {questionExist && (
            <div key={question.id} className="my-2 p-4 bg-accent-1 rounded-lg">
              {question.image && (
                <Image
                  alt=""
                  src={question.image}
                  width={400}
                  height={400}
                  layout="responsive"
                />
              )}
              <div className="text-xl text-accent-7 font-semibold">
                {question.question}
              </div>
              <div className="mt-4 flex flex-col gap-2 w-full">
                {question.alternativeA && (
                  <div
                    onClick={() => handleResult("A")}
                    className={cn(
                      "p-2 w-full rounded-lg bg-accent-2 cursor-pointer flex gap-4 items-center",
                      {
                        "bg-red-500 text-white":
                          optionSel === "A" && !isCorrect,
                        "bg-green-500 text-white":
                          optionSel === "A" && isCorrect,
                      }
                    )}
                  >
                    <div className="text-3xl font-bold">A</div>
                    {question.alternativeA}
                  </div>
                )}
                {question.alternativeB && (
                  <div
                    onClick={() => handleResult("B")}
                    className={cn(
                      "p-2 w-full rounded-lg bg-accent-2 cursor-pointer flex gap-4 items-center",
                      {
                        "bg-red-500 text-white":
                          optionSel === "B" && !isCorrect,
                        "bg-green-500 text-white":
                          optionSel === "B" && isCorrect,
                      }
                    )}
                  >
                    <div className="text-3xl font-bold">B</div>
                    {question.alternativeB}
                  </div>
                )}
                {question.alternativeC && (
                  <div
                    onClick={() => handleResult("C")}
                    className={cn(
                      "p-2 w-full rounded-lg bg-accent-2 cursor-pointer flex gap-4 items-center",
                      {
                        "bg-red-500 text-white":
                          optionSel === "C" && !isCorrect,
                        "bg-green-500 text-white":
                          optionSel === "C" && isCorrect,
                      }
                    )}
                  >
                    <div className="text-3xl font-bold">C</div>
                    {question.alternativeC}
                  </div>
                )}
                {question.alternativeD && (
                  <div
                    onClick={() => handleResult("D")}
                    className={cn(
                      "p-2 w-full rounded-lg bg-accent-2 cursor-pointer flex gap-4 items-center",
                      {
                        "bg-red-500 text-white":
                          optionSel === "D" && !isCorrect,
                        "bg-green-500 text-white":
                          optionSel === "D" && isCorrect,
                      }
                    )}
                  >
                    <div className="text-3xl font-bold">D</div>
                    {question.alternativeD}
                  </div>
                )}
                {question.alternativeE && (
                  <div
                    onClick={() => handleResult("E")}
                    className={cn(
                      "p-2 w-full rounded-lg bg-accent-2 cursor-pointer flex gap-4 items-center",
                      {
                        "bg-red-500 text-white":
                          optionSel === "E" && !isCorrect,
                        "bg-green-500 text-white":
                          optionSel === "E" && isCorrect,
                      }
                    )}
                  >
                    <div className="text-3xl font-bold">E</div>
                    {question.alternativeE}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
