export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'command-choice';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: 'basic',
    title: 'Examen Básico',
    description: 'Evalúa tu conocimiento fundamental de Nmap: flags básicos, sintaxis y conceptos generales.',
    questions: [
      {
        id: 1,
        question: '¿Qué hace la opción -sV en Nmap?',
        type: 'multiple-choice',
        options: [
          'Escanea solo puertos UDP',
          'Detecta versiones de servicios y aplicaciones',
          'Realiza un escaneo sigiloso',
          'Especifica un rango de puertos'
        ],
        correctAnswer: 1,
        explanation: '-sV activa la detección de versiones. Nmap intenta identificar qué servicios y versiones específicas están corriendo en los puertos abiertos.'
      },
      {
        id: 2,
        question: '¿Cuál es la diferencia principal entre -sS y -sT?',
        type: 'multiple-choice',
        options: [
          '-sS escanea UDP, -sT escanea TCP',
          '-sS es más rápido y sigiloso (no completa conexiones), -sT establece conexiones completas',
          'No hay diferencia, son sinónimos',
          '-sS requiere root, -sT no'
        ],
        correctAnswer: 1,
        explanation: '-sS (SYN scan) es más rápido y sigiloso porque no completa la conexión TCP. -sT (TCP Connect) establece conexiones completas y es más lento pero más confiable.'
      },
      {
        id: 3,
        question: '¿Qué comando usarías para escanear solo los puertos 80, 443 y 8080?',
        type: 'command-choice',
        options: [
          'nmap -p 80,443,8080 192.168.1.1',
          'nmap --ports 80,443,8080 192.168.1.1',
          'nmap -ports 80 443 8080 192.168.1.1',
          'nmap 192.168.1.1:80,443,8080'
        ],
        correctAnswer: 0,
        explanation: 'La opción -p permite especificar puertos individuales o rangos. La sintaxis correcta es: nmap -p 80,443,8080 <objetivo>'
      },
      {
        id: 4,
        question: '¿Qué significa la opción -A en Nmap?',
        type: 'multiple-choice',
        options: [
          'Escaneo automático',
          'Escaneo agresivo (incluye OS detection, version detection, scripts y traceroute)',
          'Escanea todos los puertos',
          'Modo avanzado'
        ],
        correctAnswer: 1,
        explanation: '-A activa el escaneo agresivo que combina detección de OS (-O), detección de versión (-sV), escaneo de scripts y traceroute. Es muy completo pero lento.'
      },
      {
        id: 5,
        question: '¿Cuándo usarías la opción -Pn?',
        type: 'multiple-choice',
        options: [
          'Para escanear solo puertos UDP',
          'Cuando el host bloquea ICMP (ping) y quieres omitir el descubrimiento de hosts',
          'Para escanear más rápido',
          'Para especificar un rango de red'
        ],
        correctAnswer: 1,
        explanation: '-Pn omite el descubrimiento de hosts (ping). Útil cuando el objetivo bloquea ICMP pero aún así quieres escanearlo.'
      },
      {
        id: 6,
        question: '¿Qué comando usarías para escanear una subred completa usando notación CIDR?',
        type: 'command-choice',
        options: [
          'nmap 192.168.1.0-255',
          'nmap 192.168.1.0/24',
          'nmap 192.168.1.*',
          'nmap --subnet 192.168.1.0'
        ],
        correctAnswer: 1,
        explanation: 'La notación CIDR /24 escanea todos los hosts de 192.168.1.0 a 192.168.1.255 (256 hosts).'
      },
      {
        id: 7,
        question: '¿Qué tipo de escaneo es más adecuado para evitar detección?',
        type: 'multiple-choice',
        options: [
          '-sT (TCP Connect)',
          '-sS (SYN scan)',
          '-A (Aggressive)',
          '-sV (Version detection)'
        ],
        correctAnswer: 1,
        explanation: '-sS (SYN scan) es más sigiloso porque no completa las conexiones TCP, dejando menos rastros en los logs del sistema objetivo.'
      },
      {
        id: 8,
        question: 'En la salida de Nmap, ¿qué significa "open" en el estado de un puerto?',
        type: 'multiple-choice',
        options: [
          'El puerto está cerrado',
          'El puerto está abierto y acepta conexiones',
          'El puerto está filtrado por un firewall',
          'El puerto no responde'
        ],
        correctAnswer: 1,
        explanation: '"open" significa que el puerto está abierto y hay un servicio escuchando en él, aceptando conexiones.'
      },
      {
        id: 9,
        question: '¿Qué comando usarías para un escaneo rápido de solo los 100 puertos más comunes?',
        type: 'command-choice',
        options: [
          'nmap --fast 192.168.1.1',
          'nmap -F 192.168.1.1',
          'nmap --quick 192.168.1.1',
          'nmap -q 192.168.1.1'
        ],
        correctAnswer: 1,
        explanation: 'La opción -F realiza un escaneo rápido de solo los 100 puertos más comunes, en lugar de los 1000 por defecto.'
      },
      {
        id: 10,
        question: '¿Qué información proporciona la opción -O?',
        type: 'multiple-choice',
        options: [
          'Versión del sistema operativo',
          'Intenta detectar el sistema operativo del host objetivo',
          'Ordena los resultados por puerto',
          'Omite el escaneo de puertos'
        ],
        correctAnswer: 1,
        explanation: '-O intenta detectar el sistema operativo del host objetivo mediante análisis de respuestas TCP/IP. Requiere privilegios de root y puede ser imprecisa.'
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Examen Intermedio',
    description: 'Pon a prueba tu conocimiento avanzado: combinación de flags, interpretación de resultados y mejores prácticas.',
    questions: [
      {
        id: 1,
        question: '¿Qué comando usarías para obtener información completa sobre un host (OS, versiones, scripts)?',
        type: 'command-choice',
        options: [
          'nmap -sV -O 192.168.1.1',
          'nmap -A 192.168.1.1',
          'nmap --full 192.168.1.1',
          'nmap -sV -O -sC 192.168.1.1'
        ],
        correctAnswer: 1,
        explanation: '-A es un atajo que combina detección de OS, versión, scripts y traceroute. Es equivalente a usar múltiples flags pero más simple.'
      },
      {
        id: 2,
        question: 'Si un host no responde a ping pero sabes que está activo, ¿qué opción usarías?',
        type: 'multiple-choice',
        options: [
          '-sP',
          '-Pn',
          '-p',
          '-v'
        ],
        correctAnswer: 1,
        explanation: '-Pn omite el descubrimiento de hosts (ping) y asume que todos los hosts están activos. Útil cuando el objetivo bloquea ICMP.'
      },
      {
        id: 3,
        question: '¿Qué significa "filtered" en el estado de un puerto?',
        type: 'multiple-choice',
        options: [
          'El puerto está abierto',
          'El puerto está cerrado',
          'Un firewall está bloqueando o filtrando el puerto',
          'El puerto no existe'
        ],
        correctAnswer: 2,
        explanation: '"filtered" significa que Nmap no puede determinar si el puerto está abierto porque un firewall está bloqueando o filtrando las sondas.'
      },
      {
        id: 4,
        question: '¿Qué comando usarías para escanear puertos UDP en un host?',
        type: 'command-choice',
        options: [
          'nmap -U 192.168.1.1',
          'nmap -sU 192.168.1.1',
          'nmap --udp 192.168.1.1',
          'nmap -pU 192.168.1.1'
        ],
        correctAnswer: 1,
        explanation: '-sU activa el escaneo UDP. Los escaneos UDP son más lentos porque UDP no confirma conexiones como TCP.'
      },
      {
        id: 5,
        question: '¿Cuál es la principal ventaja de usar -sS sobre -sT?',
        type: 'multiple-choice',
        options: [
          'Es más preciso',
          'Es más rápido y menos detectable',
          'No requiere privilegios de root',
          'Escanea más puertos'
        ],
        correctAnswer: 1,
        explanation: '-sS es más rápido porque no completa las conexiones TCP, y es menos detectable porque no deja conexiones completas en los logs.'
      },
      {
        id: 6,
        question: '¿Qué comando usarías para escanear un rango de puertos del 1000 al 2000?',
        type: 'command-choice',
        options: [
          'nmap -p 1000-2000 192.168.1.1',
          'nmap -p 1000:2000 192.168.1.1',
          'nmap --range 1000-2000 192.168.1.1',
          'nmap -p 1000..2000 192.168.1.1'
        ],
        correctAnswer: 0,
        explanation: 'La sintaxis para rangos de puertos es -p inicio-fin. Por ejemplo: -p 1000-2000 escanea todos los puertos del 1000 al 2000.'
      },
      {
        id: 7,
        question: 'Si quieres información detallada durante el escaneo, ¿qué opción usarías?',
        type: 'multiple-choice',
        options: [
          '-d',
          '-v',
          '-i',
          '-l'
        ],
        correctAnswer: 1,
        explanation: '-v (verbose) muestra información detallada durante el escaneo. Puedes usar -vv o -vvv para aún más detalle.'
      },
      {
        id: 8,
        question: '¿Qué comando usarías para escanear múltiples hosts específicos separados por comas?',
        type: 'command-choice',
        options: [
          'nmap 192.168.1.1,192.168.1.2,192.168.1.3',
          'nmap 192.168.1.1-3',
          'nmap --hosts 192.168.1.1 192.168.1.2 192.168.1.3',
          'nmap -m 192.168.1.1,192.168.1.2,192.168.1.3'
        ],
        correctAnswer: 0,
        explanation: 'Puedes especificar múltiples hosts separándolos con comas: nmap host1,host2,host3'
      },
      {
        id: 9,
        question: '¿Cuál es la diferencia entre "closed" y "filtered" en los resultados de Nmap?',
        type: 'multiple-choice',
        options: [
          'No hay diferencia',
          '"Closed" significa que el puerto está cerrado pero accesible; "filtered" significa que un firewall está bloqueando',
          '"Filtered" significa cerrado, "closed" significa abierto',
          'Ambos significan lo mismo'
        ],
        correctAnswer: 1,
        explanation: '"Closed" significa que el puerto está cerrado pero Nmap pudo acceder a él. "Filtered" significa que un firewall está bloqueando las sondas y Nmap no puede determinar el estado.'
      },
      {
        id: 10,
        question: '¿Qué comando combinaría para hacer un escaneo sigiloso con detección de versiones en puertos específicos?',
        type: 'command-choice',
        options: [
          'nmap -sS -sV -p 80,443 192.168.1.1',
          'nmap --stealth --version -p 80,443 192.168.1.1',
          'nmap -sS -V -ports 80,443 192.168.1.1',
          'nmap -stealth -version 80,443 192.168.1.1'
        ],
        correctAnswer: 0,
        explanation: 'Puedes combinar múltiples flags: -sS para SYN scan, -sV para detección de versiones, y -p para especificar puertos. La sintaxis correcta es: nmap -sS -sV -p 80,443 <objetivo>'
      }
    ]
  }
];

