export interface UserProgress {
  completedLessons: number[];
  completedScenarios: string[];
  examScores: {
    [quizId: string]: number;
  };
  achievements: string[];
}

const STORAGE_KEY = 'nmap-learning-lab-progress';

export function getProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultProgress();
    }
  }
  return getDefaultProgress();
}

export function getDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    completedScenarios: [],
    examScores: {},
    achievements: []
  };
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function completeLesson(lessonId: number): void {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveProgress(progress);
    checkAchievements(getProgress());
  }
}

export function completeScenario(scenarioId: string): void {
  const progress = getProgress();
  if (!progress.completedScenarios.includes(scenarioId)) {
    progress.completedScenarios.push(scenarioId);
    saveProgress(progress);
    checkAchievements(getProgress());
  }
}

export function saveExamScore(quizId: string, score: number): void {
  const progress = getProgress();
  const currentBest = progress.examScores[quizId] || 0;
  if (score > currentBest) {
    progress.examScores[quizId] = score;
    saveProgress(progress);
  }
}

export function addAchievement(achievementId: string): void {
  const progress = getProgress();
  if (!progress.achievements.includes(achievementId)) {
    progress.achievements.push(achievementId);
    saveProgress(progress);
  }
}

export function checkAchievements(progress: UserProgress): string[] {
  const newAchievements: string[] = [];
  
  // Todas las lecciones completadas
  if (progress.completedLessons.length >= 5 && !progress.achievements.includes('all-lessons')) {
    newAchievements.push('all-lessons');
  }
  
  // 3 escenarios completados
  if (progress.completedScenarios.length >= 3 && !progress.achievements.includes('3-scenarios')) {
    newAchievements.push('3-scenarios');
  }
  
  // Examen básico aprobado
  if (progress.examScores['basic'] >= 70 && !progress.achievements.includes('passed-basic')) {
    newAchievements.push('passed-basic');
  }
  
  // Examen intermedio aprobado con >80%
  if (progress.examScores['intermediate'] >= 80 && !progress.achievements.includes('passed-intermediate-80')) {
    newAchievements.push('passed-intermediate-80');
  }
  
  // Certificado (todas las lecciones + ambos exámenes >70%)
  if (
    progress.completedLessons.length >= 5 &&
    progress.examScores['basic'] >= 70 &&
    progress.examScores['intermediate'] >= 70 &&
    !progress.achievements.includes('certificate')
  ) {
    newAchievements.push('certificate');
  }
  
  newAchievements.forEach(achievement => addAchievement(achievement));
  
  return newAchievements;
}

