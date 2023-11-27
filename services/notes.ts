import httpClient from "../helpers/http-client";

export async function addNotes(formData: FormData) {
  return await httpClient.post("/notes/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function fetchNotes() {
  return httpClient.get("/notes");
}

export async function fetchStudentNotes() {
  return httpClient.get("/notes/students");
}
