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

  // console.log("Auth cookie:", cookie);

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

export const getChannels = async () => {
  const cookie = await getAuthCookie();

  if (!cookie) return [];

  return axios
    .get(`${BASE_URL}/channels`, { headers: { Cookie: cookie } })
    .then((res) => res.data);
};

export const getVideos = async () => {
  const cookie = await getAuthCookie();

  if (!cookie) return [];

  const res = await fetch(`${BASE_URL}/videos`, {
    headers: { Cookie: cookie },
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

export const getVideo = async (id: string) => {
    const cookie = await getAuthCookie();

  if (!cookie) return [];

  const res = await fetch(`${BASE_URL}/videos/${id}`, {
    headers: { Cookie: cookie },
  });
  if (!res.ok) throw new Error("Failed to fetch video");
  return res.json();
};

export const getChannelAnalytics = async (days = 30) => {
  const cookie = await getAuthCookie();

  if (!cookie) return [];

  return axios.get(`${BASE_URL}/dashboard/analytics?days=${days}`, {
    headers: { Cookie: cookie },
  }).then(res => res.data);
}