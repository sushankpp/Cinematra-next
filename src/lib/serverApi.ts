import { cookies } from "next/headers";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return token ? `token=${token.value}` : "";
}

export const getRecommendations = async () => {
  const cookie = await getAuthCookie();

  console.log("Auth cookie:", cookie);

  if (!cookie) return [];

  return axios
    .get(`${BASE_URL}/videos/recommendations`, { headers: { Cookie: cookie } })
    .then((res) => res.data);
};

export const getPersonalTrending = async () => {
  const cookie = await getAuthCookie();

  if (!cookie) return [];

  return axios
    .get(`${BASE_URL}/videos/trending/me`, { headers: { Cookie: cookie } })
    .then((res) => res.data);
};
