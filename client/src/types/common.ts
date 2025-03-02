export type QuestionType = {
    clues: string[];
    options: string[];
    id: number;
}


export type validateRequestType = {
    id: number;
    answer: string
}

export type validateResponseType = {
    isCorrect: boolean;
    city: string,
    funfact: string[],
    trivia: string[],
}

export type GamePropsType = {
    question: QuestionType;
    onSelect: (v: validateRequestType) => any
}

export interface SnackbarProps {
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
    open: boolean;
    onClose: () => void;
    duration?: number; // Optional duration in milliseconds
}