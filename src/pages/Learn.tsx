import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessons } from '../config/lessons';
import { Terminal } from '../components/Terminal';
import { LearningPanel } from '../components/LearningPanel';
import { completeLesson, getProgress } from '../utils/storage';

export function Learn() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const progress = getProgress();

  if (lessonId) {
    const lesson = lessons.find((l) => l.id === parseInt(lessonId));
    if (!lesson) {
      return (
        <div>
          <h1 className="text-2xl font-bold text-red-400">Lección no encontrada</h1>
          <Link to="/learn" className="text-hacker-green">Volver a Lecciones</Link>
        </div>
      );
    }

    return <LessonDetail lesson={lesson} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          &gt; Aprender
        </h1>
        <p className="text-gray-400">
          Lecciones guiadas sobre Nmap. Completa cada lección escribiendo el comando correcto.
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/learn/${lesson.id}`}
              className="block bg-hacker-darker border border-hacker-green/30 rounded-lg p-6 hover:border-hacker-green/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📖</span>
                    <h2 className="text-xl font-bold text-hacker-green font-mono">
                      Lección {lesson.id}: {lesson.title}
                    </h2>
                    {isCompleted && (
                      <span className="text-xs bg-hacker-green/20 text-hacker-green px-2 py-1 rounded">
                        ✓ Completada
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {lesson.theory[0]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lesson.examples.slice(0, 2).map((example, idx) => (
                      <code
                        key={idx}
                        className="text-xs bg-hacker-green/10 text-hacker-green px-2 py-1 rounded font-mono"
                      >
                        {example.command}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function LessonDetail({ lesson }: { lesson: typeof lessons[0] }) {
  const [lastCommand, setLastCommand] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');
  const [completed, setCompleted] = useState(
    getProgress().completedLessons.includes(lesson.id)
  );

  const handleCommand = (command: string) => {
    setLastCommand(command);
    setError('');
    setHint('');

    // Normalizar comando (quitar espacios extra, convertir a minúsculas para comparación)
    const normalized = command.toLowerCase().trim();
    const expected = lesson.expectedCommand.toLowerCase().trim();

    if (normalized === expected) {
      setOutput(lesson.simulatedOutput);
      if (!completed) {
        completeLesson(lesson.id);
        setCompleted(true);
        setTimeout(() => {
          alert('¡Lección completada! 🎉');
        }, 500);
      }
    } else {
      // Verificar si tiene el comando base pero le falta algo
      if (normalized.includes('nmap') && !normalized.includes(lesson.expectedCommand.split(' ')[1] || '')) {
        setHint('El comando parece estar incompleto. Revisa la lección para ver el comando esperado.');
      } else {
        setError('Comando incorrecto. Intenta escribir exactamente: ' + lesson.expectedCommand);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/learn" className="text-hacker-green hover:underline mb-4 inline-block">
          ← Volver a Lecciones
        </Link>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          Lección {lesson.id}: {lesson.title}
        </h1>
        {completed && (
          <span className="inline-block text-xs bg-hacker-green/20 text-hacker-green px-3 py-1 rounded mb-4">
            ✓ Completada
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Theory */}
          <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
              📚 Teoría
            </h2>
            <ul className="space-y-2 text-gray-300">
              {lesson.theory.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-hacker-green mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
              💻 Ejemplos
            </h2>
            <div className="space-y-4">
              {lesson.examples.map((example, idx) => (
                <div key={idx} className="border-l-2 border-hacker-green pl-4">
                  <code className="text-hacker-green font-mono text-sm block mb-1">
                    {example.command}
                  </code>
                  <p className="text-gray-400 text-sm">{example.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Terminal */}
          <div>
            <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
              🎯 Inténtalo
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Escribe el comando esperado: <code className="text-hacker-green font-mono">{lesson.expectedCommand}</code>
            </p>
            <Terminal
              onCommand={handleCommand}
              output={output}
              error={error}
              hint={hint}
              disabled={completed}
            />
          </div>
        </div>

        {/* Learning Panel */}
        <div className="lg:col-span-1">
          <LearningPanel lastCommand={lastCommand} />
        </div>
      </div>
    </div>
  );
}

