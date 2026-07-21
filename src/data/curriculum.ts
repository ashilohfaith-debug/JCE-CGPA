export interface Subject {
  code: string;
  name: string;
  credits: number;
}

export const semester1Subjects: Subject[] = [
  { code: 'JHS2121', name: 'English for Communicative Competence', credits: 3 },
  { code: 'JGE2102', name: 'Heritage of Tamils', credits: 1 },
  { code: 'JMA2121', name: 'Matrices and Calculus', credits: 3 },
  { code: 'JPH2101', name: 'Engineering Physics 1', credits: 3 },
  { code: 'JCY2101', name: 'Engineering Chemistry', credits: 3 },
  { code: 'JGE2101', name: 'Basic Engineering', credits: 3 },
  { code: 'JCS2121', name: 'Programming in C', credits: 4 },
  { code: 'JPC2111', name: 'Engineering Physics and Chemistry Laboratory', credits: 1 },
  { code: 'JGE2111', name: 'Basic Engineering Laboratory', credits: 1 },
];

export const semester2Subjects: Subject[] = [
  { code: 'JHS2221', name: 'English for Science and Technology', credits: 3 },
  { code: 'JGE2202', name: 'Tamils and Technology', credits: 1 },
  { code: 'JMA2221', name: 'Statistics for Engineers', credits: 3 },
  { code: 'JPH2201', name: 'Engineering Physics 2', credits: 3 },
  { code: 'JCY2201', name: 'Environmental Science and Sustainability', credits: 2 },
  { code: 'JGE2221', name: 'Engineering Graphics', credits: 3 },
  { code: 'JCS2201', name: 'Python Programming', credits: 3 },
  { code: 'JPC2211', name: 'Engineering Physics and Environmental Science Laboratory', credits: 1 },
  { code: 'JCS2211', name: 'Python Programming Laboratory', credits: 2 },
  { code: 'JGE2241', name: 'Gaming and Crafts studio', credits: 2 },
];

export const gradePoints: Record<string, number> = {
  'S': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6.5,
  'C+': 6,
  'C': 5,
  'U': 0,
  'SA': 0,
  'WC': 0,
};
