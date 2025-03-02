import { QuestionType, validateRequestType } from "../types";
import { validateResponseType } from "../types/common";
const URL: string = import.meta.env.VITE_API_URL;

export async function fetchRandomQuestion(): Promise<QuestionType | undefined> {
    try {
        const response: Response = await fetch(`${URL}/api/random`);
        const data = await response.json();
        let randomQuestion: QuestionType = {
            clues: data?.clues,
            options: data?.options,
            id: data?.id
        }
        return randomQuestion;
    } catch (err: any) {
        throw new Error(`error fetching question`)
    }
}

export async function validate(v: validateRequestType): Promise<validateResponseType | undefined> {
    try {
        const response: Response = await fetch(`${URL}/api/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(v),
        });
        const data = await response.json();
        const res: validateResponseType = {
            isCorrect: data?.isCorrect,
            city: data?.city,
            funfact: data?.funfact,
            trivia: data?.trivia
        }
        return res;
    }
    catch (err) {
        throw new Error("error validating")
    }
}