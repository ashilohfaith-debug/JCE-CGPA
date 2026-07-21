import type { Subject } from '../data/curriculum';
import { gradePoints } from '../data/curriculum';

export function calculateGPA(subjects: Subject[], selectedGrades: Record<string, string>): number | null {
  let totalGradePoints = 0;
  let totalCredits = 0;
  let allGradesSelected = true;

  for (const subject of subjects) {
    const grade = selectedGrades[subject.code];
    if (!grade) {
      allGradesSelected = false;
      continue;
    }

    const point = gradePoints[grade];
    if (point !== undefined) {
      totalGradePoints += point * subject.credits;
      totalCredits += subject.credits;
    }
  }

  if (!allGradesSelected || totalCredits === 0) return null;
  
  return totalGradePoints / totalCredits;
}

export function calculateCGPA(gpa1: number | null, gpa2: number | null): number | null {
  if (gpa1 === null || gpa2 === null) return null;
  return (gpa1 + gpa2) / 2;
}
