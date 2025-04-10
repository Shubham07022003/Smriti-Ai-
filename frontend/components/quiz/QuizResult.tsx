import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export type QuizFinalResultProps = {
  score: number;
  total: number;
};

const QuizFinalResult = ({ score, total }: QuizFinalResultProps) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      <h2 className="text-3xl font-bold text-lime-400">Your Quiz Summary</h2>

      <div className="w-40 h-40">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: "#bef264",
            trailColor: "#1e1e2f",
            textSize: "16px",
          })}
        />
      </div>

      <p className="text-white text-lg">
        You answered <span className="font-bold text-lime-300">{score}</span> out of{" "}
        <span className="font-bold text-lime-300">{total}</span> questions correctly.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-lime-400 text-black px-6 py-2 rounded hover:bg-lime-300"
      >
        Retry Quiz
      </button>
    </div>
  );
};

export default QuizFinalResult;
