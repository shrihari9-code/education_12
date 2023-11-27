import httpClient from "../helpers/http-client";

export async function fetchUserProfile() {
  return httpClient.get("/profile");
}

export async function fetchStudents() {
  return httpClient.get("/profile/students");
}
