export interface Flag {
  flag: string;
  name: string;
  description: string;
  example?: string;
}

export const flags: Flag[] = [
  {
    flag: '-sS',
    name: 'TCP SYN Scan',
    description: 'Escaneo SYN (half-open). Rápido y sigiloso. No completa la conexión TCP, por lo que es menos detectable.',
    example: 'nmap -sS 192.168.1.1'
  },
  {
    flag: '-sT',
    name: 'TCP Connect Scan',
    description: 'Escaneo TCP completo. Establece conexiones completas. Más lento pero más confiable.',
    example: 'nmap -sT 192.168.1.1'
  },
  {
    flag: '-sU',
    name: 'UDP Scan',
    description: 'Escaneo UDP. Más lento que TCP porque UDP no tiene confirmación de conexión.',
    example: 'nmap -sU 192.168.1.1'
  },
  {
    flag: '-sV',
    name: 'Version Detection',
    description: 'Detecta versiones de servicios y aplicaciones en los puertos abiertos.',
    example: 'nmap -sV 192.168.1.1'
  },
  {
    flag: '-O',
    name: 'OS Detection',
    description: 'Intenta detectar el sistema operativo del host objetivo.',
    example: 'nmap -O 192.168.1.1'
  },
  {
    flag: '-A',
    name: 'Aggressive Scan',
    description: 'Escaneo agresivo. Incluye detección de OS, versión, scripts y traceroute.',
    example: 'nmap -A 192.168.1.1'
  },
  {
    flag: '-p',
    name: 'Port Specification',
    description: 'Especifica puertos o rangos de puertos a escanear.',
    example: 'nmap -p 80,443,8080 192.168.1.1'
  },
  {
    flag: '-Pn',
    name: 'Skip Ping',
    description: 'Omite el descubrimiento de hosts (ping). Útil cuando el host bloquea ICMP.',
    example: 'nmap -Pn 192.168.1.1'
  },
  {
    flag: '-F',
    name: 'Fast Scan',
    description: 'Escaneo rápido. Solo escanea los 100 puertos más comunes.',
    example: 'nmap -F 192.168.1.1'
  },
  {
    flag: '-v',
    name: 'Verbose',
    description: 'Modo verboso. Muestra más información durante el escaneo.',
    example: 'nmap -v 192.168.1.1'
  }
];

export function getFlagExplanation(command: string): Flag[] {
  const parts = command.trim().split(/\s+/);
  const foundFlags: Flag[] = [];
  
  parts.forEach(part => {
    if (part.startsWith('-')) {
      const flag = flags.find(f => f.flag === part);
      if (flag) {
        foundFlags.push(flag);
      }
    }
  });
  
  return foundFlags;
}

