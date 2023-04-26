import questions from "./../databases/questions";

export const getQuestions = () => {
  try {
    const response = questions;
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionById = (id) => {
  try {
    const response = questions.find((item) => item.id === id);
    return response;
  } catch (error) {
    console.log(error);
  }
};
