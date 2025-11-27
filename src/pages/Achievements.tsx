import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProgress } from '../utils/storage';
import { achievements } from '../utils/achievements';
import { Certificate } from '../components/Certificate';

export function Achievements() {
  const [progress, setProgress] = useState(getProgress());
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const userAchievements = achievements.filter((a) =>
    progress.achievements.includes(a.id)
  );

  const hasCertificate = progress.achievements.includes('certificate');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          &gt; Logros
        </h1>
        <p className="text-gray-400">
          Tus logros y reconocimientos en el Nmap Learning Lab
        </p>
      </div>

      {/* Certificate Section */}
      {hasCertificate && (
        <div className="bg-hacker-darker border-2 border-hacker-green/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-hacker-green mb-2">
                🎓 Certificado de Fundamentos
              </h2>
              <p className="text-gray-300">
                ¡Felicidades! Has completado todas las lecciones y aprobado ambos exámenes.
              </p>
            </div>
            <button
              onClick={() => setShowCertificate(true)}
              className="px-6 py-3 bg-hacker-green/20 hover:bg-hacker-green/30 border border-hacker-green rounded font-mono text-hacker-green transition-colors"
            >
              Ver Certificado
            </button>
          </div>
        </div>
      )}

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = progress.achievements.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`border rounded-lg p-6 ${
                isUnlocked
                  ? 'bg-hacker-darker border-hacker-green/50'
                  : 'bg-gray-900 border-gray-800 opacity-50'
              }`}
            >
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="text-lg font-bold text-hacker-green mb-2 font-mono">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-400">{achievement.description}</p>
              {isUnlocked && (
                <div className="mt-4 text-xs text-hacker-green">✓ Desbloqueado</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
          Resumen de Progreso
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-hacker-green">
              {userAchievements.length}/{achievements.length}
            </div>
            <div className="text-xs text-gray-400 mt-1">Logros</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-hacker-green">
              {progress.completedLessons.length}/5
            </div>
            <div className="text-xs text-gray-400 mt-1">Lecciones</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-hacker-green">
              {progress.completedScenarios.length}/3
            </div>
            <div className="text-xs text-gray-400 mt-1">Escenarios</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-hacker-green">
              {Object.keys(progress.examScores).length}/2
            </div>
            <div className="text-xs text-gray-400 mt-1">Exámenes</div>
          </div>
        </div>
      </div>

      {showCertificate && (
        <Certificate onClose={() => setShowCertificate(false)} />
      )}
    </div>
  );
}

