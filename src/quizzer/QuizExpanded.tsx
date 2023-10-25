import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Question } from "../interfaces/question";
import { Quiz } from "../interfaces/quiz";

import "./QuizExpanded.css";
import { QuizQuestion } from "./QuizQuestion";

export const QuizExpanded = ({
    quiz,
    editQuiz,
    resetView,
    switchEdit
}: {
    quiz: Quiz;
    editQuiz: (quizId: number, updatedQuiz: Quiz) => void;
    resetView: () => void;
    switchEdit: () => void;
}) => {
    const filteredQuestions = quiz.questionList.filter(
        (q: Question) => (quiz.published && q.published) || !quiz.published
    );

    const [p, sp] = useState<number>(0);
    const [submitArr, setSubmitArr] = useState<boolean[]>(
        new Array(filteredQuestions.length).fill(false)
    );

    const handleQuestionSubmit = (index: number) => {
        const newSubmitArr = [...submitArr];
        newSubmitArr[index] = true;
        setSubmitArr(newSubmitArr);
    };

    const totalPoints = filteredQuestions.reduce(
        (prev: number, q: Question) => prev + q.points,
        0
    );

    const addPoints = (points: number) => {
        sp((prevCount) => prevCount + points);
    };

    const reset = () => {
        setSubmitArr(new Array(filteredQuestions.length).fill(false));
        editQuiz(quiz.id, {
            ...quiz,
            questionList: quiz.questionList.map((q: Question) => ({
                ...q,
                submission: "",
            })),
        });

        sp(0);
    };

    const editQuestionSub = (questionId: number, submission: string) => {
        const updatedQuestionList = quiz.questionList.map((q: Question) => {
            if (q.id === questionId) {
                return { ...q, submission };
            }
            return q;
        });

        editQuiz(quiz.id, {
            ...quiz,
            questionList: updatedQuestionList,
        });
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-baseline">
                    <h1 className="title">{quiz.title}</h1>
                    <p>
                        {filteredQuestions.length} question
                        {filteredQuestions.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <div>
                    <Button
                        className="esc_button text-align-center"
                        variant="warning"
                        onClick={() => {
                            reset();
                            switchEdit();
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        className="esc_button text-align-center"
                        variant="danger"
                        onClick={resetView}
                    >
                        {"Exit"}
                    </Button>
                </div>
            </div>
            <p className="desc">{quiz.body}</p>
            {filteredQuestions.map((q: Question, index: number) => (
                <QuizQuestion
                    key={quiz.id + "|" + q.id}
                    index={index}
                    question={q}
                    submitted={submitArr[index]}
                    handleSubmit={handleQuestionSubmit}
                    addPoints={addPoints}
                    editQuestionSub={editQuestionSub}
                ></QuizQuestion>
            ))}
            <hr />
            <div className="footer">
                <Button variant="danger" onClick={reset}>
                    Reset
                </Button>
                <span className="score_report">
                    {p}/{totalPoints}
                </span>
            </div>
        </>
    );
};
