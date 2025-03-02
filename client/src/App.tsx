import { useEffect, useState } from "react";
import { QuestionType, validateRequestType, validateResponseType } from "./types"
import { useWindowSize, fetchRandomQuestion, validate } from "./utils";
import ReactConfetti from "react-confetti";

import "./App.css"
import Snackbar from "./components/SnackBar";

function App() {
  const { width, height } = useWindowSize();

  const [score, setScore] = useState<number>(0);

  const [correct, setCorrect] = useState<string | undefined>()
  const [inCorrect, setInCorrect] = useState<string | undefined>();

  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const [question, setQuestion] = useState<QuestionType>();
  const [error, setError] = useState<string>();

  let previousQuestion: QuestionType | undefined = question;

  const handleNext = async () => {
    try {
      const nextQuestion: QuestionType | undefined = await fetchRandomQuestion();
      // bad code
      if (nextQuestion?.id == previousQuestion?.id) {
        handleNext();
      }
      setCorrect(undefined)
      setInCorrect(undefined)
      setQuestion(nextQuestion);
    } catch (err: any) {
      setError(err.message)
      console.log(err)
    }
  }

  const handlePlayAgain = () => {
    if (isCorrect) {
      setScore(p => p - 1)
    }
    setCorrect(undefined)
    setInCorrect(undefined)
  }

  async function handleSelect({ id, answer }: validateRequestType) {
    try {
      const data: validateResponseType | undefined = await validate({ id, answer });
      if (data === undefined) {
        throw new Error("Validate failed")
      }

      setIsCorrect(data.isCorrect)
      if (data.isCorrect) {
        setScore(p => p + 1)
        setCorrect(data.city);
        return;
      }
      setError("Wrong Guess!😢😢")
      setCorrect(data.city);
      setInCorrect(answer)

    } catch (err: any) {
      setError(err.message)
      console.log(err)
    }
  }


  useEffect(() => {
    (async function () {
      try {
        const randomQuestion: QuestionType = await fetchRandomQuestion() as QuestionType;
        setQuestion((_) => randomQuestion)
      } catch (err: any) {
        setError(err.message)
        console.log(err)
      }
    })()
  }, [])



  const { clues, id, options } = question != undefined ? question as QuestionType : {}

  return (
    <div className="container">
      <div className="header">
        <h1>Globetrotter</h1>
      </div>

      <div className="top-container">
        <div className="score-box">Score: <span id="score">{score}</span></div>

        <button className="button" onClick={handleNext}>Next</button>
        <button className="button" onClick={handlePlayAgain}>Play Again</button>
        <button className="button">Invite</button>

      </div>


      {question &&

        <div className="game-container">
          <div className="clue-container">
            {clues?.map((clue, i) => (
              <div key={i} className="clue">{clue}</div>
            ))}
          </div>

          <div className="options-grid">
            {options?.map((option, _) => (
              <button
                key={option}
                className={`option ${correct === option && "correct"} ${inCorrect === option && "incorrect"}`}
                onClick={() => handleSelect({ id: id!, answer: option })}
                disabled={correct != undefined || inCorrect != undefined}
              >

                {option}

              </button>
            ))
            }
          </div>
        </div >

      }
      {isCorrect && <>
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={1500}
          recycle={false}
          onConfettiComplete={() => setIsCorrect(false)}
        />
        <Snackbar severity="success" message="Correct Guess" open={isCorrect} onClose={() => { }}></Snackbar>
      </>
      }
      {error && <Snackbar message={error} severity="error" open={error != undefined} onClose={() => { setError(undefined) }} duration={1000}></Snackbar>}

    </div>
  )
}


export default App