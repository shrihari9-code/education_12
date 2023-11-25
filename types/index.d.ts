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

type SelectedAnswers = {
  [questionIndex: number]: string;
};

type Test = {
  testId: string;
  title: string;
  startTimestamp: Date;
  endTimestamp: Date;
  teacherId: string;
  maxMarks: number;
  questionsCount: number;
};

type TestQuestion = {
  keyAnswer: string;
  options: string[];
  title: string;
};
