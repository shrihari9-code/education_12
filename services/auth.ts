import httpClient from "../helpers/http-client";

export async function userLogin(credentials: User) {
  return httpClient.post("/auth/login", credentials);
}

export async function addStudent(email: string, password: string) {
  return httpClient.post("/auth/students/add", { email, password });
}
