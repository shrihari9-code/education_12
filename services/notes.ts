import httpClient from "../helpers/http-client";

export async function addNotes(file: File) {}

export async function fetchNotes() {
  return httpClient.get("/notes");
}

export async function fetchStudentNotes() {
  return httpClient.get("/notes/students");
}
