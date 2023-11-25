import httpClient from "../helpers/http-client";

export async function createTest(formData: FormData) {
  return httpClient.post("/tests/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function fetchTests() {
  return httpClient.get("/tests");
}

export async function fetchTestInformation(testId: string) {
  return httpClient.get(`/tests/${testId}`);
}

export async function updateTestInformations(testId: string) {
  return httpClient.patch(`/tests/${testId}`);
}

export async function cancelTest(testId: string) {
  return httpClient.delete(`/tests/${testId}`);
}

export async function fetchStudentTests() {
  return httpClient.get("/tests/students");
}

export async function fetchTestQuestions(testId: string) {
  return httpClient.get(`/tests/students/${testId}/questions`);
}

export async function submitTestResponse(testId: string, testResponse: any) {
  return httpClient.post(`/tests/${testId}/submit`, testResponse);
}

export async function fetchStudentRankings() {
  return httpClient.get("/tests/students/rankings");
}
