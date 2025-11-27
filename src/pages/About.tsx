export function About() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-hacker-green font-mono mb-2">
          &gt; Acerca de
        </h1>
        <p className="text-gray-400">
          Información sobre Nmap y este simulador educativo
        </p>
      </div>

      <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-6 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-hacker-green mb-3 font-mono">
            ¿Qué es Nmap?
          </h2>
          <p className="text-gray-300 mb-3">
            Nmap (Network Mapper) es una herramienta de código abierto para exploración de red y auditoría de seguridad. 
            Fue diseñada para descubrir hosts y servicios en una red de computadoras, construyendo así un "mapa" de la red.
          </p>
          <p className="text-gray-300">
            Nmap ofrece una amplia gama de capacidades, incluyendo:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-3 space-y-1 ml-4">
            <li>Descubrimiento de hosts en una red</li>
            <li>Escaneo de puertos (TCP y UDP)</li>
            <li>Detección de servicios y versiones</li>
            <li>Detección de sistema operativo</li>
            <li>Scripts de detección de vulnerabilidades</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-hacker-green mb-3 font-mono">
            Uso Ético
          </h2>
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded p-4 mb-3">
            <p className="text-yellow-400 font-bold mb-2">⚠️ ADVERTENCIA IMPORTANTE</p>
            <p className="text-gray-300 text-sm">
              Nmap es una herramienta poderosa que puede ser utilizada tanto para propósitos legítimos como maliciosos. 
              Es tu responsabilidad usarla de manera ética y legal.
            </p>
          </div>
          <p className="text-gray-300 mb-3">
            <strong className="text-hacker-green">Solo usa Nmap en:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Redes de tu propiedad</li>
            <li>Redes donde tengas autorización explícita por escrito</li>
            <li>Ambientes de prueba y laboratorios controlados</li>
            <li>Servicios públicos que inviten explícitamente a ser escaneados (como scanme.nmap.org)</li>
          </ul>
          <p className="text-gray-300 mt-3">
            <strong className="text-red-400">NUNCA uses Nmap en:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>Redes sin autorización</li>
            <li>Sistemas que no te pertenecen</li>
            <li>Con el propósito de acceder no autorizado a sistemas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-hacker-green mb-3 font-mono">
            Sobre este Simulador
          </h2>
          <div className="bg-hacker-green/10 border border-hacker-green/30 rounded p-4 mb-3">
            <p className="text-hacker-green font-bold mb-2">ℹ️ IMPORTANTE</p>
            <p className="text-gray-300 text-sm">
              Este es un <strong>SIMULADOR EDUCATIVO</strong>. <strong>NO ejecuta Nmap real</strong> y 
              <strong> NO escanea redes reales</strong>. Todas las salidas son predefinidas y simuladas.
            </p>
          </div>
          <p className="text-gray-300 mb-3">
            El Nmap Learning Lab es una aplicación educativa diseñada para enseñar los conceptos fundamentales 
            de Nmap de manera segura y controlada. Este simulador:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>No ejecuta comandos Nmap reales</li>
            <li>No escanea redes ni sistemas reales</li>
            <li>Usa salidas predefinidas y simuladas</li>
            <li>Es completamente seguro para usar en cualquier entorno</li>
            <li>Está diseñado únicamente para fines educativos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-hacker-green mb-3 font-mono">
            Recursos Adicionales
          </h2>
          <p className="text-gray-300 mb-3">
            Para aprender más sobre Nmap y su uso real:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
            <li>
              <a 
                href="https://nmap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-hacker-green hover:underline"
              >
                Sitio oficial de Nmap
              </a>
            </li>
            <li>
              <a 
                href="https://nmap.org/book/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-hacker-green hover:underline"
              >
                Guía oficial de Nmap
              </a>
            </li>
            <li>
              <a 
                href="https://nmap.org/book/man.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-hacker-green hover:underline"
              >
                Manual de referencia de Nmap
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-hacker-green mb-3 font-mono">
            Créditos
          </h2>
          <p className="text-gray-300">
            Este simulador fue creado con fines educativos para ayudar a los estudiantes a aprender 
            los conceptos fundamentales de Nmap de manera segura y práctica.
          </p>
          <p className="text-gray-400 text-sm mt-3">
            Nmap es una marca registrada de Gordon Lyon (Fyodor). Este proyecto no está afiliado con Nmap.org.
          </p>
        </section>
      </div>
    </div>
  );
}

