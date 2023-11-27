type User = {
  email: string;
  password: string;
  role: "teacher" | "student";
};

type Profile = {
  firstName: string;
  lastName: string;
  dob: Date;
  school: string;
  userId: string;
};

type Notes = {
  _id: string;
  title: string;
  description: string;
  url: string;
  teacherId: string;
  type: string;
};

type Lecture = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  teacherId: string;
};

type LectureDetails = Omit<Lecture, "teacherId">;

type ServerResponse = {
  success: boolean;
  content: any;
  message: string;
};

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type SelectedAnswer = {
  questionId: string;
  selectedOption: number;
};

type Test = {
  testId: string;
  title: string;
  startTimestamp: Date | null;
  endTimestamp: Date | null;
  teacherId: string;
  maxMarks: number;
  questionsCount: number;
  studentCount: number;
};

type TestQuestion = {
  keyAnswer: string;
  options: string[];
  title: string;
  questionId: string;
};

type Ranking = {
  userScore: number;
  maxScore: number;
  rank: number;
  testName: string;
  studentId: string;
};

type TestStatistics = {
  test: Test;
  standings: Standing[];
  highestScore: number;
  lowestScore: number;
  avgScore: number;
};
