export interface Lesson {
  id: number;
  title: string;
  theory: string[];
  examples: {
    command: string;
    explanation: string;
  }[];
  expectedCommand: string;
  simulatedOutput: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: '¿Qué es Nmap y sintaxis básica?',
    theory: [
      'Nmap (Network Mapper) es una herramienta de código abierto para exploración de red y auditoría de seguridad.',
      'Se usa para descubrir hosts y servicios en una red, así como para identificar vulnerabilidades.',
      'Sintaxis básica: nmap [opciones] <objetivo>',
      'El objetivo puede ser una IP, un rango de IPs, o un nombre de dominio.',
      'Nmap es una herramienta poderosa que debe usarse solo en redes propias o con autorización explícita.'
    ],
    examples: [
      {
        command: 'nmap 192.168.1.1',
        explanation: 'Escanea un host individual por IP'
      },
      {
        command: 'nmap scanme.nmap.org',
        explanation: 'Escanea un host por nombre de dominio'
      }
    ],
    expectedCommand: 'nmap 192.168.1.1',
    simulatedOutput: `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 10:30 UTC
Nmap scan report for 192.168.1.1
Host is up (0.045s latency).
Not shown: 998 closed ports
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 2.15 seconds`
  },
  {
    id: 2,
    title: 'Escaneo de un host y múltiples hosts',
    theory: [
      'Puedes escanear un solo host especificando su IP o dominio.',
      'Para múltiples hosts, puedes usar rangos CIDR, listas separadas por comas, o rangos numéricos.',
      'Ejemplos de rangos: 192.168.1.0/24, 192.168.1.1-10, 192.168.1.1,192.168.1.2',
      'El escaneo de múltiples hosts toma más tiempo pero es útil para auditorías de red completas.'
    ],
    examples: [
      {
        command: 'nmap 192.168.1.1-10',
        explanation: 'Escanea IPs del 1 al 10 en la red 192.168.1.x'
      },
      {
        command: 'nmap 192.168.1.0/24',
        explanation: 'Escanea toda la subred (254 hosts)'
      }
    ],
    expectedCommand: 'nmap 192.168.1.1-5',
    simulatedOutput: `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 10:35 UTC
Nmap scan report for 192.168.1.1
Host is up (0.032s latency).
PORT   STATE SERVICE
80/tcp open  http

Nmap scan report for 192.168.1.2
Host is up (0.028s latency).
PORT   STATE SERVICE
22/tcp open  ssh

Nmap scan report for 192.168.1.3
Host is up (0.041s latency).
PORT   STATE SERVICE
443/tcp open  https

Nmap scan report for 192.168.1.4
Host is up (0.035s latency).
All 1000 scanned ports on 192.168.1.4 are closed

Nmap scan report for 192.168.1.5
Host is up (0.029s latency).
PORT   STATE SERVICE
3389/tcp open  ms-wbt-server

Nmap done: 5 IP addresses (5 hosts up) scanned in 8.42 seconds`
  },
  {
    id: 3,
    title: 'Tipos de escaneo de puertos (-sS, -sT, -sU)',
    theory: [
      '-sS (SYN scan): Escaneo sigiloso que no completa la conexión TCP. Rápido y menos detectable.',
      '-sT (TCP Connect scan): Establece conexiones completas. Más lento pero más confiable.',
      '-sU (UDP scan): Escanea puertos UDP. Muy lento porque UDP no confirma conexiones.',
      'Por defecto, Nmap usa SYN scan si tienes privilegios de root, o TCP Connect si no.',
      'Los escaneos UDP son importantes porque muchos servicios críticos usan UDP.'
    ],
    examples: [
      {
        command: 'nmap -sS 192.168.1.1',
        explanation: 'Escaneo SYN sigiloso (requiere root)'
      },
      {
        command: 'nmap -sT 192.168.1.1',
        explanation: 'Escaneo TCP completo (no requiere root)'
      },
      {
        command: 'nmap -sU 192.168.1.1',
        explanation: 'Escaneo UDP'
      }
    ],
    expectedCommand: 'nmap -sS 192.168.1.1',
    simulatedOutput: `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 10:40 UTC
Nmap scan report for 192.168.1.1
Host is up (0.038s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 1.82 seconds`
  },
  {
    id: 4,
    title: 'Detección de servicios y versiones (-sV)',
    theory: [
      '-sV detecta qué servicios y versiones están corriendo en los puertos abiertos.',
      'Esta información es crucial para identificar vulnerabilidades conocidas.',
      'El escaneo con -sV es más lento que un escaneo básico de puertos.',
      'Nmap intenta identificar el servicio mediante banners y respuestas características.',
      'La información de versión ayuda a determinar si un servicio necesita actualizaciones.'
    ],
    examples: [
      {
        command: 'nmap -sV 192.168.1.1',
        explanation: 'Escanea puertos y detecta versiones de servicios'
      },
      {
        command: 'nmap -sV -p 80,443 192.168.1.1',
        explanation: 'Detecta versiones solo en puertos específicos'
      }
    ],
    expectedCommand: 'nmap -sV 192.168.1.1',
    simulatedOutput: `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 10:45 UTC
Nmap scan report for 192.168.1.1
Host is up (0.042s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5
80/tcp  open  http    Apache httpd 2.4.41
443/tcp open  ssl/http Apache httpd 2.4.41

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 12.35 seconds`
  },
  {
    id: 5,
    title: 'Detección de OS y escaneo agresivo (-O, -A)',
    theory: [
      '-O intenta detectar el sistema operativo del host objetivo mediante análisis de respuestas TCP/IP.',
      '-A es un escaneo agresivo que combina: detección de OS (-O), detección de versión (-sV), escaneo de scripts, y traceroute.',
      'La detección de OS requiere privilegios de root y puede ser imprecisa.',
      'El escaneo agresivo es muy completo pero también muy lento y ruidoso.',
      'Usa -A cuando necesites la máxima información sobre un objetivo.'
    ],
    examples: [
      {
        command: 'nmap -O 192.168.1.1',
        explanation: 'Intenta detectar el sistema operativo'
      },
      {
        command: 'nmap -A 192.168.1.1',
        explanation: 'Escaneo agresivo completo (OS, versión, scripts)'
      }
    ],
    expectedCommand: 'nmap -A 192.168.1.1',
    simulatedOutput: `Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 10:50 UTC
Nmap scan report for 192.168.1.1
Host is up (0.040s latency).
Not shown: 997 closed ports
PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5
| ssh-hostkey: 
|   3072 aa:bb:cc:dd:ee:ff:11:22:33:44:55:66:77:88:99:00 (RSA)
|   256 11:22:33:44:55:66:77:88:99:00:aa:bb:cc:dd:ee:ff (ECDSA)
80/tcp  open  http    Apache httpd 2.4.41
|_http-title: Welcome to Apache
443/tcp open  ssl/http Apache httpd 2.4.41
|_http-title: Welcome to Apache
| ssl-cert: Subject: commonName=example.com
Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5.4
OS details: Linux 5.4 - 5.15
Network Distance: 1 hop

TRACEROUTE
HOP RTT     ADDRESS
1   40.12 ms 192.168.1.1

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 25.67 seconds`
  }
];

