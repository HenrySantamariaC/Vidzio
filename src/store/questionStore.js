import { create } from "zustand";
import { getQuestions } from "./../services/QuestionsService";

export const useQuestionStore = create((set, get) => ({
  listQuestions: [],
  current: {},
  getQuestionsList: () => {
    const response = getQuestions();
    set((state) => ({
      current: state.current,
      listQuestions: [...response],
    }));
  },
  getQuestionById: (id) => {
    const { listQuestions } = get();
    const question = listQuestions.find((item) => item.id === id);
    set(() => ({
      current: question,
    }));
  },
  setUrlObjectQuestion: (newUrlObject) => {
    const { listQuestions, current } = get();
    let questionsList = [...listQuestions];
    const index = questionsList.findIndex((item) => item.id === current.id);
    const newCurrent = {
      ...current,
      urlObject: newUrlObject,
    };
    questionsList.splice(index, 1, newCurrent);
    set(() => ({
      current: newCurrent,
      listQuestions: questionsList,
    }));
  },
}));
