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

type LectureDetails = Pick<Lecture, "title" | "_id">;

type ServerResponse = {
  success: boolean;
  content: any;
  message: string;
};
