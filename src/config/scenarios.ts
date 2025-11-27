export interface Scenario {
  id: string;
  title: string;
  description: string;
  objective: string;
  allowedCommands: string[];
  hints: {
    [key: string]: string;
  };
  outputs: {
    [key: string]: string;
  };
}

export const scenarios: Scenario[] = [
  {
    id: 'simple-lan',
    title: 'Red LAN Simple',
    description: 'Tienes acceso a una red local y necesitas descubrir qué hosts están activos y qué servicios ofrecen.',
    objective: 'Escanea la red 192.168.1.0/24 para encontrar hosts activos y sus puertos abiertos.',
    allowedCommands: [
      'nmap 192.168.1.0/24',
      'nmap -sS 192.168.1.0/24',
      'nmap -sT 192.168.1.0/24',
      'nmap -F 192.168.1.0/24'
    ],
    hints: {
      'missing-target': 'Necesitas especificar el objetivo: 192.168.1.0/24',
      'wrong-target': 'El objetivo debe ser 192.168.1.0/24',
      'too-complex': 'Para este escenario básico, un escaneo simple es suficiente'
    },
    outputs: {
      'nmap 192.168.1.0/24': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:00 UTC
Nmap scan report for 192.168.1.1
Host is up (0.025s latency).
PORT   STATE SERVICE
80/tcp open  http

Nmap scan report for 192.168.1.10
Host is up (0.031s latency).
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap scan report for 192.168.1.50
Host is up (0.028s latency).
PORT   STATE SERVICE
443/tcp open  https

Nmap done: 256 IP addresses (3 hosts up) scanned in 45.23 seconds`,
      'nmap -sS 192.168.1.0/24': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:00 UTC
Nmap scan report for 192.168.1.1
Host is up (0.025s latency).
PORT   STATE SERVICE
80/tcp open  http

Nmap scan report for 192.168.1.10
Host is up (0.031s latency).
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap scan report for 192.168.1.50
Host is up (0.028s latency).
PORT   STATE SERVICE
443/tcp open  https

Nmap done: 256 IP addresses (3 hosts up) scanned in 38.15 seconds`,
      'nmap -sT 192.168.1.0/24': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:00 UTC
Nmap scan report for 192.168.1.1
Host is up (0.025s latency).
PORT   STATE SERVICE
80/tcp open  http

Nmap scan report for 192.168.1.10
Host is up (0.031s latency).
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap scan report for 192.168.1.50
Host is up (0.028s latency).
PORT   STATE SERVICE
443/tcp open  https

Nmap done: 256 IP addresses (3 hosts up) scanned in 52.67 seconds`,
      'nmap -F 192.168.1.0/24': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:00 UTC
Nmap scan report for 192.168.1.1
Host is up (0.025s latency).
PORT   STATE SERVICE
80/tcp open  http

Nmap scan report for 192.168.1.10
Host is up (0.031s latency).
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap scan report for 192.168.1.50
Host is up (0.028s latency).
PORT   STATE SERVICE
443/tcp open  https

Nmap done: 256 IP addresses (3 hosts up) scanned in 28.42 seconds`
    }
  },
  {
    id: 'exposed-web',
    title: 'Servidor Web Expuesto',
    description: 'Has descubierto un servidor web en 10.0.0.50. Necesitas identificar qué servicios y versiones está ejecutando para evaluar su seguridad.',
    objective: 'Identifica los servicios y versiones corriendo en el servidor web 10.0.0.50.',
    allowedCommands: [
      'nmap -sV 10.0.0.50',
      'nmap -sV -p 80,443 10.0.0.50',
      'nmap -A 10.0.0.50'
    ],
    hints: {
      'missing-sv': 'Necesitas usar -sV para detectar versiones de servicios',
      'missing-target': 'El objetivo debe ser 10.0.0.50',
      'wrong-target': 'El objetivo debe ser 10.0.0.50'
    },
    outputs: {
      'nmap -sV 10.0.0.50': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:10 UTC
Nmap scan report for 10.0.0.50
Host is up (0.035s latency).
Not shown: 998 closed ports
PORT    STATE SERVICE VERSION
80/tcp  open  http    nginx 1.18.0
443/tcp open  ssl/http nginx 1.18.0

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 15.23 seconds`,
      'nmap -sV -p 80,443 10.0.0.50': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:10 UTC
Nmap scan report for 10.0.0.50
Host is up (0.035s latency).
PORT    STATE SERVICE VERSION
80/tcp  open  http    nginx 1.18.0
443/tcp open  ssl/http nginx 1.18.0

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.45 seconds`,
      'nmap -A 10.0.0.50': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:10 UTC
Nmap scan report for 10.0.0.50
Host is up (0.035s latency).
Not shown: 998 closed ports
PORT    STATE SERVICE VERSION
80/tcp  open  http    nginx 1.18.0
|_http-title: Welcome to nginx!
443/tcp open  ssl/http nginx 1.18.0
|_http-title: Welcome to nginx!
| ssl-cert: Subject: commonName=web.example.com
Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5.4
OS details: Linux 5.4 - 5.15
Network Distance: 1 hop

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 28.67 seconds`
    }
  },
  {
    id: 'stealth-scan',
    title: 'Desafío de Escaneo Sigiloso',
    description: 'Necesitas escanear un host sin dejar rastros detectables. El objetivo bloquea conexiones completas pero permite escaneos SYN.',
    objective: 'Realiza un escaneo sigiloso del host 172.16.0.100 usando SYN scan.',
    allowedCommands: [
      'nmap -sS 172.16.0.100',
      'nmap -sS -F 172.16.0.100'
    ],
    hints: {
      'missing-ss': 'Para un escaneo sigiloso necesitas usar -sS (SYN scan)',
      'missing-target': 'El objetivo debe ser 172.16.0.100',
      'wrong-target': 'El objetivo debe ser 172.16.0.100',
      'too-noisy': 'Un escaneo -sT o -A es demasiado ruidoso para este escenario'
    },
    outputs: {
      'nmap -sS 172.16.0.100': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:20 UTC
Nmap scan report for 172.16.0.100
Host is up (0.042s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 1.95 seconds`,
      'nmap -sS -F 172.16.0.100': `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 11:20 UTC
Nmap scan report for 172.16.0.100
Host is up (0.042s latency).
Not shown: 97 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 1.23 seconds`
    }
  }
];

