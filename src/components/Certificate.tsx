import { useState, useRef } from 'react';
// import { getProgress } from '../utils/storage';

interface CertificateProps {
  onClose: () => void;
}

export function Certificate({ onClose }: CertificateProps) {
  const [name, setName] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);
  // const progress = getProgress();

  const handleDownload = () => {
    if (!certificateRef.current) return;

    // Crear un canvas para convertir el componente a imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Fondo oscuro
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Borde verde
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Título
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Nmap Learning Lab', canvas.width / 2, 150);

    // Subtítulo
    ctx.fillStyle = '#00ff00';
    ctx.font = '32px monospace';
    ctx.fillText('Certificado de Fundamentos', canvas.width / 2, 220);

    // Nombre
    ctx.fillStyle = '#ffffff';
    ctx.font = '36px monospace';
    ctx.fillText(`Este certificado se otorga a`, canvas.width / 2, 320);
    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 40px monospace';
    ctx.fillText(name || 'Estudiante', canvas.width / 2, 380);

    // Descripción
    ctx.fillStyle = '#cccccc';
    ctx.font = '24px monospace';
    ctx.fillText('Por completar todas las lecciones y aprobar ambos exámenes', canvas.width / 2, 460);

    // Fecha
    const date = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillStyle = '#888888';
    ctx.font = '20px monospace';
    ctx.fillText(date, canvas.width / 2, 550);

    // Descargar
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nmap-certificate-${name || 'student'}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-hacker-darker border-2 border-hacker-green rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-hacker-green font-mono">
            Certificado de Fundamentos
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-hacker-green text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-mono">
            Nombre para el certificado:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full bg-hacker-dark border border-hacker-green/30 rounded px-4 py-2 text-hacker-green font-mono focus:outline-none focus:border-hacker-green"
          />
        </div>

        <div
          ref={certificateRef}
          className="bg-hacker-dark border-2 border-hacker-green rounded-lg p-12 text-center mb-6"
          style={{ minHeight: '500px' }}
        >
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-hacker-green font-mono mb-4">
                Nmap Learning Lab
              </h1>
              <h2 className="text-2xl text-hacker-green font-mono">
                Certificado de Fundamentos
              </h2>
            </div>

            <div className="my-8">
              <p className="text-gray-300 text-lg mb-4">
                Este certificado se otorga a
              </p>
              <p className="text-3xl font-bold text-hacker-green font-mono">
                {name || 'Estudiante'}
              </p>
            </div>

            <div className="my-8">
              <p className="text-gray-400">
                Por completar todas las lecciones y aprobar ambos exámenes
              </p>
            </div>

            <div className="mt-12">
              <p className="text-gray-500 text-sm">
                {new Date().toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded font-mono text-sm transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-hacker-green/20 hover:bg-hacker-green/30 border border-hacker-green rounded font-mono text-sm text-hacker-green transition-colors"
          >
            Descargar PNG
          </button>
        </div>
      </div>
    </div>
  );
}

