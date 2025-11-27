import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scenarios } from '../config/scenarios';
import { Terminal } from '../components/Terminal';
import { LearningPanel } from '../components/LearningPanel';
import { completeScenario, getProgress } from '../utils/storage';

export function Practice() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const progress = getProgress();

  if (scenarioId) {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) {
      return (
        <div>
          <h1 className="text-2xl font-bold text-red-400">Escenario no encontrado</h1>
          <Link to="/practice" className="text-hacker-green">Volver a Escenarios</Link>
        </div>
      );
    }

    return <ScenarioDetail scenario={scenario} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          &gt; Practicar
        </h1>
        <p className="text-gray-400">
          Escenarios de laboratorio interactivos. Practica comandos Nmap en situaciones realistas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario) => {
          const isCompleted = progress.completedScenarios.includes(scenario.id);
          return (
            <Link
              key={scenario.id}
              to={`/practice/${scenario.id}`}
              className="block bg-hacker-darker border border-hacker-green/30 rounded-lg p-6 hover:border-hacker-green/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-hacker-green font-mono">
                  {scenario.title}
                </h2>
                {isCompleted && (
                  <span className="text-xs bg-hacker-green/20 text-hacker-green px-2 py-1 rounded">
                    ✓ Completado
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-3">{scenario.description}</p>
              <div className="border-t border-hacker-green/20 pt-3">
                <p className="text-xs text-gray-500">
                  <strong className="text-hacker-green">Objetivo:</strong> {scenario.objective}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ScenarioDetail({ scenario }: { scenario: typeof scenarios[0] }) {
  const [lastCommand, setLastCommand] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');
  const [completed, setCompleted] = useState(
    getProgress().completedScenarios.includes(scenario.id)
  );

  const handleCommand = (command: string) => {
    setLastCommand(command);
    setError('');
    setHint('');

    const normalized = command.trim().toLowerCase();
    const allowed = scenario.allowedCommands.map(c => c.toLowerCase().trim());

    // Verificar si el comando está permitido
    if (allowed.includes(normalized)) {
      const exactMatch = scenario.allowedCommands.find(
        c => c.toLowerCase().trim() === normalized
      );
      if (exactMatch && scenario.outputs[exactMatch]) {
        setOutput(scenario.outputs[exactMatch]);
        if (!completed) {
          completeScenario(scenario.id);
          setCompleted(true);
          setTimeout(() => {
            alert('¡Escenario completado! 🎉');
          }, 500);
        }
      }
    } else {
      // Proporcionar hints útiles
      if (!normalized.includes('nmap')) {
        setError('Debes usar un comando Nmap. Ejemplo: nmap <objetivo>');
      } else if (scenario.allowedCommands.some(c => c.includes('192.168.1.0/24')) && !normalized.includes('192.168.1.0/24')) {
        setHint(scenario.hints['missing-target'] || scenario.hints['wrong-target'] || 'Revisa el objetivo del escenario.');
      } else if (scenario.allowedCommands.some(c => c.includes('-sV')) && !normalized.includes('-sv')) {
        setHint(scenario.hints['missing-sv'] || 'Necesitas usar -sV para detectar versiones.');
      } else if (scenario.allowedCommands.some(c => c.includes('-sS')) && !normalized.includes('-ss')) {
        setHint(scenario.hints['missing-ss'] || 'Para un escaneo sigiloso necesitas -sS.');
      } else {
        setError('Comando no válido para este escenario. Revisa el objetivo y los hints disponibles.');
        if (Object.keys(scenario.hints).length > 0) {
          const firstHint = Object.values(scenario.hints)[0];
          setHint(firstHint);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link to="/practice" className="text-hacker-green hover:underline mb-4 inline-block">
          ← Volver a Escenarios
        </Link>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          {scenario.title}
        </h1>
        {completed && (
          <span className="inline-block text-xs bg-hacker-green/20 text-hacker-green px-3 py-1 rounded mb-4">
            ✓ Completado
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
              📋 Descripción
            </h2>
            <p className="text-gray-300 mb-4">{scenario.description}</p>
            <div className="border-t border-hacker-green/20 pt-4">
              <p className="text-sm text-gray-400 mb-1">
                <strong className="text-hacker-green">Objetivo:</strong>
              </p>
              <p className="text-gray-300">{scenario.objective}</p>
            </div>
          </div>

          {/* Terminal */}
          <div>
            <h2 className="text-xl font-bold text-hacker-green mb-4 font-mono">
              💻 Terminal
            </h2>
            <Terminal
              onCommand={handleCommand}
              output={output}
              error={error}
              hint={hint}
              disabled={false}
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

