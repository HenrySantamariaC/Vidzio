import { create } from "zustand";
import { getQuestions } from "./../services/QuestionsService";
import { persist } from "zustand/middleware";

export const useQuestionStore = create(
  persist(
    (set, get) => ({
      listQuestions: [],
      currentIndex: 0,
      loadQuestionsList: () => {
        const response = getQuestions();
        set((state) => ({
          ...state,
          listQuestions: [...response],
        }));
      },
      getIndexQuestionById: (id) => {
        const { listQuestions } = get();
        const index = listQuestions.findIndex((item) => item.id === id);
        set((state) => ({
          ...state,
          currentIndex: index,
        }));
      },
      addAnswerQuestion: (id, answer) =>
        set((state) => ({
          listQuestions: state.listQuestions.map((question) =>
            question.id === id
              ? { ...question, urlObject: answer, isAnswered: true }
              : question
          ),
        })),
    }),
    {
      name: "vidzio-store",
    }
  )
);
