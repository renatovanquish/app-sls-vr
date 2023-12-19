import { useState, useEffect } from "react";
import { useQuiz } from "hooks/useQuiz";
import { Modal, Loading } from "components/ui";
import { useScreen } from "hooks/useScreen";
import { Trash, Edit, Cross, Plus2, Search } from "components/icons";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { toast } from "react-toast";
import cn from "classnames";

import QuestionForm from "./QuestionForm";
import { userInfo } from "os";

interface Props {
  quizID: string;
  name: string
  userID: string
}

export default function TabQuestions(props: Props) {
  const { quizID, name, userID } = props;
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionSel, setQuestionSel] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const { screenWidth, screenHeight } = useScreen();

  const { listQuestionsByQuiz, deleteQuizQuestion } = useQuiz();

  const fetchData = async () => {
    setQuestions([]);
    const { items, nextToken } = await listQuestionsByQuiz({
      quizID,
      limit: 1000,
    });
    setQuestions(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {
      setLoading(true);
      setQuestions([]);
      setSearch("");
    };
  }, [quizID]);

  const onClickItem = (e: any) => {
    const { action, item } = e;
    if (action === "DELETE") {
      openActionSheetDelete(item);
    }
  };

  const openActionSheetDelete = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir a questão? : ${e.question}`,
      message: e.question,
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
      await deleteQuizQuestion({ id: e.id });
      fetchData();
      toast("Questão excluída com sucesso.", {
        backgroundColor: "#263238",
        color: "#fff",
      });
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
    setQuestionSel({} as any);
    fetchData();
  };

  return loading ? (
    <div className="mt-4"><Loading /></div>
  ) : (
    <div className="mt-4 overflow-x-auto w-full">
      <div className="p-1 bg-accent-5 rounded-lg flex justify-between">
        <div
          style={{ width: 240 }}
          className={cn(
            "cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150"
          )}
        >
          <input
            className="text-accent-9 py-2 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            autoComplete="off"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <div className="cursor-pointer text-accent-7 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search />
          </div>
        </div>
        <div className="p-1">
          <a
            className="cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
            onClick={() => {
              setQuestionSel({} as any);
              setShowModal(true);
            }}
          >
            <Plus2 />
          </a>
        </div>
      </div>

      <div className="mt-4">
        {questions.map(
          (c: any, i: number) =>
            c.question.toLowerCase().indexOf(search.toLowerCase()) !== -1 && (
              <div key={i}>
                <div
                  className={`my-1 w-full bg-slate-50 rounded-lg p-3 ${
                    i && "pt-3"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-accent-9 font-semibold text-lg">
                        {c.question}
                      </h2>
                    </div>
                    <div
                      style={{ minWidth: 100 }}
                      className="flex justify-end flex-wrap gap-2 content-center"
                    >
                      <a
                        data-tip="Editar"
                        title="Editar"
                        className="text-blue-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                        onClick={() => {
                          setQuestionSel(c);
                          setShowModal(true);
                        }}
                      >
                        <Edit />
                      </a>

                      <a
                        data-tip="Excluir"
                        title="Excluir"
                        onClick={() =>
                          onClickItem({
                            action: "DELETE",
                            item: c,
                          })
                        }
                        className="mr-2 text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                      >
                        <Trash />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      <Modal
        hideHeader={true}
        open={showModal}
        onClose={onCloseModal}
        focusTrap={false}
        fullSize={true}
      >
        <div
          className="overflow-y-auto bg-accent-0 pr-2"
          style={{
            width: screenWidth,
            height: screenHeight,
          }}
        >
          <div className="sticky top-0 z-50 bg-accent-0">
            <div className="flex justify-between">
              <div>
                <div className="pl-4 pt-1 text-base font-semibold line-clamp-1">
                  {name}
                </div>
                <div className="pl-4 text-xs">Quiz</div>
              </div>
              <div className="pt-3 pr-4">
                <button
                  onClick={onCloseModal}
                  aria-label="Close"
                  className="cursor-pointer bg-accent-1 p-2 rounded-full"
                >
                  <Cross className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 overflow-y-auto">
            <QuestionForm
              quizID={quizID}
              onCloseModal={onCloseModal}
              questionSel={questionSel}
              userID={userID}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
