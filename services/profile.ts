import httpClient from "../helpers/http-client";

export async function fetchUserProfile() {
  return httpClient.get("/profile");
}
