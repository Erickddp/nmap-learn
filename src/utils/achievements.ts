export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: 'all-lessons',
    title: 'Estudiante Dedicado',
    description: 'Completaste todas las lecciones',
    icon: '📚'
  },
  {
    id: '3-scenarios',
    title: 'Experto en Práctica',
    description: 'Completaste 3 escenarios de práctica',
    icon: '🎯'
  },
  {
    id: 'passed-basic',
    title: 'Fundamentos Dominados',
    description: 'Aprobaste el examen básico',
    icon: '✅'
  },
  {
    id: 'passed-intermediate-80',
    title: 'Maestro Intermedio',
    description: 'Aprobaste el examen intermedio con más del 80%',
    icon: '🏆'
  },
  {
    id: 'certificate',
    title: 'Certificado de Fundamentos',
    description: 'Completaste todas las lecciones y aprobaste ambos exámenes',
    icon: '🎓'
  }
];

