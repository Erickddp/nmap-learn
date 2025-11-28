import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizzes } from '../config/quizzes';
import { saveExamScore, getProgress, checkAchievements } from '../utils/storage';

export function Exams() {
  const { quizId } = useParams<{ quizId: string }>();
  const progress = getProgress();

  if (quizId) {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) {
      return (
        <div>
          <h1 className="text-2xl font-bold text-red-400">Examen no encontrado</h1>
          <Link to="/exams" className="text-hacker-green">Volver a Exámenes</Link>
        </div>
      );
    }

    return <ExamDetail quiz={quiz} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          &gt; Exámenes
        </h1>
        <p className="text-gray-400">
          Evalúa tu conocimiento de Nmap con estos cuestionarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => {
          const score = progress.examScores[quiz.id];
          return (
            <Link
              key={quiz.id}
              to={`/exams/${quiz.id}`}
              className="block bg-hacker-darker border border-hacker-green/30 rounded-lg p-6 hover:border-hacker-green/50 transition-colors"
            >
              <h2 className="text-xl font-bold text-hacker-green font-mono mb-2">
                {quiz.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {quiz.questions.length} preguntas
                </span>
                {score ? (
                  <span
                    className={`font-bold ${
                      score >= 70 ? 'text-hacker-green' : 'text-yellow-400'
                    }`}
                  >
                    Mejor: {score}%
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm">No realizado</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ExamDetail({ quiz }: { quiz: typeof quizzes[0] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, idx) => {
      if (answers[idx] === question.correctAnswer) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(calculatedScore);
    saveExamScore(quiz.id, calculatedScore);
    checkAchievements(getProgress());
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div>
          <Link to="/exams" className="text-hacker-green hover:underline mb-4 inline-block">
            ← Volver a Exámenes
          </Link>
          <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
            Resultados: {quiz.title}
          </h1>
        </div>

        <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-hacker-green mb-2">{score}%</div>
            <div className="text-gray-400">
              {score >= 70 ? '✅ Aprobado' : '❌ No aprobado'}
            </div>
          </div>

          <div className="space-y-4">
            {quiz.questions.map((question, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div
                  key={idx}
                  className={`border rounded-lg p-4 ${
                    isCorrect
                      ? 'border-hacker-green/50 bg-hacker-green/10'
                      : 'border-red-400/50 bg-red-400/10'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <p className="text-gray-300 font-bold mb-2">
                        {idx + 1}. {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          const isCorrectOption = optIdx === question.correctAnswer;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2 rounded text-sm ${
                                isCorrectOption
                                  ? 'bg-hacker-green/20 border border-hacker-green'
                                  : isSelected
                                  ? 'bg-red-400/20 border border-red-400'
                                  : 'bg-gray-800 border border-gray-700'
                              }`}
                            >
                              {isCorrectOption && '✓ '}
                              {isSelected && !isCorrectOption && '✗ '}
                              <code className="font-mono">{option}</code>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-xs text-gray-400">
                          <strong className="text-hacker-green">Explicación:</strong>{' '}
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/exams"
              className="inline-block px-6 py-3 bg-hacker-green/20 hover:bg-hacker-green/30 border border-hacker-green rounded font-mono text-hacker-green transition-colors"
            >
              Volver a Exámenes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const userAnswer = answers[currentQuestion];

  return (
    <div className="space-y-6">
      <div>
        <Link to="/exams" className="text-hacker-green hover:underline mb-4 inline-block">
          ← Volver a Exámenes
        </Link>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          {quiz.title}
        </h1>
        <div className="text-sm text-gray-400">
          Pregunta {currentQuestion + 1} de {quiz.questions.length}
        </div>
      </div>

      <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-300 mb-4">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded border transition-colors font-mono text-sm ${
                  userAnswer === idx
                    ? 'bg-hacker-green/20 border-hacker-green text-hacker-green'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-hacker-green/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-hacker-green/20">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 rounded font-mono text-sm transition-colors"
          >
            ← Anterior
          </button>

          <div className="text-xs text-gray-400">
            {Object.keys(answers).length} / {quiz.questions.length} respondidas
          </div>

          <button
            onClick={handleNext}
            disabled={userAnswer === undefined}
            className="px-4 py-2 bg-hacker-green/20 hover:bg-hacker-green/30 disabled:opacity-50 disabled:cursor-not-allowed border border-hacker-green rounded font-mono text-sm text-hacker-green transition-colors"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Finalizar →' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
}

