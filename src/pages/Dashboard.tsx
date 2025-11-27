import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProgress } from '../utils/storage';
import { lessons } from '../config/lessons';
import { scenarios } from '../config/scenarios';
import { quizzes } from '../config/quizzes';

export function Dashboard() {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const totalLessons = lessons.length;
  const completedLessons = progress.completedLessons.length;
  const completedScenarios = progress.completedScenarios.length;
  const totalScenarios = scenarios.length;
  const overallProgress = Math.round(
    ((completedLessons + completedScenarios + Object.keys(progress.examScores).length) /
      (totalLessons + totalScenarios + quizzes.length)) *
      100
  );

  const getNextRecommendedStep = () => {
    // Encontrar primera lección no completada
    const nextLesson = lessons.find(
      (lesson) => !progress.completedLessons.includes(lesson.id)
    );
    if (nextLesson) {
      return {
        type: 'lesson',
        title: `Completar Lección ${nextLesson.id}: ${nextLesson.title}`,
        link: `/learn/${nextLesson.id}`
      };
    }

    // Encontrar primer escenario no completado
    const nextScenario = scenarios.find(
      (scenario) => !progress.completedScenarios.includes(scenario.id)
    );
    if (nextScenario) {
      return {
        type: 'scenario',
        title: `Intentar Escenario: ${nextScenario.title}`,
        link: `/practice/${nextScenario.id}`
      };
    }

    // Verificar exámenes
    if (!progress.examScores['basic']) {
      return {
        type: 'exam',
        title: 'Tomar Examen Básico',
        link: '/exams/basic'
      };
    }
    if (!progress.examScores['intermediate']) {
      return {
        type: 'exam',
        title: 'Tomar Examen Intermedio',
        link: '/exams/intermediate'
      };
    }

    return {
      type: 'complete',
      title: '¡Has completado todo! Revisa tus logros.',
      link: '/achievements'
    };
  };

  const recommendation = getNextRecommendedStep();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          &gt; Dashboard
        </h1>
        <p className="text-gray-400">Bienvenido al Nmap Learning Lab</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
          <div className="text-4xl font-bold text-hacker-green mb-2">
            {overallProgress}%
          </div>
          <div className="text-gray-400 text-sm">Progreso General</div>
          <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-hacker-green transition-all"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
          <div className="text-4xl font-bold text-hacker-green mb-2">
            {completedLessons}/{totalLessons}
          </div>
          <div className="text-gray-400 text-sm">Lecciones Completadas</div>
        </div>

        <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
          <div className="text-4xl font-bold text-hacker-green mb-2">
            {completedScenarios}/{totalScenarios}
          </div>
          <div className="text-gray-400 text-sm">Escenarios Completados</div>
        </div>
      </div>

      {/* Exam Status */}
      <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
          Estado de Exámenes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => {
            const score = progress.examScores[quiz.id];
            return (
              <div
                key={quiz.id}
                className="border border-hacker-green/20 rounded p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 font-mono">{quiz.title}</span>
                  {score ? (
                    <span
                      className={`font-bold ${
                        score >= 70 ? 'text-hacker-green' : 'text-yellow-400'
                      }`}
                    >
                      {score}%
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">No realizado</span>
                  )}
                </div>
                {score && (
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        score >= 70 ? 'bg-hacker-green' : 'bg-yellow-400'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Recommended Step */}
      <div className="bg-hacker-darker border-2 border-hacker-green/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
          📍 Siguiente Paso Recomendado
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-lg mb-1">{recommendation.title}</p>
            <p className="text-gray-500 text-sm">
              {recommendation.type === 'lesson' &&
                'Continúa aprendiendo los conceptos fundamentales de Nmap.'}
              {recommendation.type === 'scenario' &&
                'Pon en práctica lo que has aprendido en un escenario realista.'}
              {recommendation.type === 'exam' &&
                'Evalúa tu conocimiento con un examen.'}
              {recommendation.type === 'complete' &&
                '¡Felicidades! Has completado todo el contenido.'}
            </p>
          </div>
          <Link
            to={recommendation.link}
            className="px-6 py-3 bg-hacker-green/20 hover:bg-hacker-green/30 border border-hacker-green rounded font-mono text-hacker-green transition-colors"
          >
            Ir →
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/learn"
          className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6 hover:border-hacker-green/50 transition-colors"
        >
          <div className="text-2xl mb-2">📚</div>
          <div className="text-hacker-green font-bold mb-1">Aprender</div>
          <div className="text-gray-400 text-sm">
            Lecciones guiadas sobre Nmap
          </div>
        </Link>

        <Link
          to="/practice"
          className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6 hover:border-hacker-green/50 transition-colors"
        >
          <div className="text-2xl mb-2">🎯</div>
          <div className="text-hacker-green font-bold mb-1">Practicar</div>
          <div className="text-gray-400 text-sm">
            Escenarios de laboratorio interactivos
          </div>
        </Link>
      </div>
    </div>
  );
}

