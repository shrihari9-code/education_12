import httpClient from "../helpers/http-client";

export async function addLecture(lecture: Omit<Lecture, "_id" | "teacherId">) {
  return httpClient.post("/lectures/add", lecture);
}

export async function fetchLectures() {
  return httpClient.get("/lectures");
}

export async function fetchStudentLectures() {
  return httpClient.get("/lectures/students");
}

export async function fetchLectureVideo(lectureId: string) {
  return httpClient.get(`/lectures/${lectureId}`);
}
