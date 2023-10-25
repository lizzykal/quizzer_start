import React, { useState } from "react";
import { Quiz } from "../interfaces/quiz";
import { QuizExpanded } from "./QuizExpanded";
import { QuizEdit } from "./QuizEdit";

import "./QuizView.css";

export const QuizView = ({
    quiz,
    editQuiz,
    deleteQuiz,
    resetView,
}: {
    quiz: Quiz;
    editQuiz: (quizId: number, updatedQuiz: Quiz) => void;
    deleteQuiz: (quizId: number) => void;
    resetView: () => void;
}) => {
    const [edit, setEdit] = useState(false);

    const switchEdit = () => {
        setEdit(!edit);
    };

    return (
        <div className="quiz_card">
            {edit ? (
                <QuizEdit
                    quiz={quiz}
                    editQuiz={editQuiz}
                    deleteQuiz={deleteQuiz}
                    switchEdit={switchEdit}
                    resetView={resetView}
                />
            ) : (
                <QuizExpanded
                    quiz={quiz}
                    editQuiz={editQuiz}
                    resetView={resetView}
                    switchEdit={switchEdit}
                />
            )}
        </div>
    );
};
