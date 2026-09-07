import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return token ? `token=${token.value}` : "";
}

export const getRecommendations = async () => {
  const cookie = await getAuthCookie();
  if (!cookie) return [];

  const res = await fetch(`${BASE_URL}/videos/recommendations`, {
    headers: { Cookie: cookie },
    next: { revalidate: 30 },
  });
  if (!res.ok) return [];
  return res.json();
};

export const getPersonalTrending = async () => {
  const cookie = await getAuthCookie();
  if (!cookie) return [];

  const res = await fetch(`${BASE_URL}/videos/trending/me`, {
    headers: { Cookie: cookie },
    next: { revalidate: 30 },
  });
  if (!res.ok) return [];
  return res.json();
};

export const getChannels = async () => {
  const cookie = await getAuthCookie();
  if (!cookie) return [];

  const res = await fetch(`${BASE_URL}/channels`, {
    headers: { Cookie: cookie },
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
};

export const getVideos = async () => {
  const cookie = await getAuthCookie();
  if (!cookie) return [];

  const res = await fetch(`${BASE_URL}/videos`, {
    headers: { Cookie: cookie },
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
};

export const getVideo = async (id: string) => {
  const cookie = await getAuthCookie();
  if (!cookie) return null;

  const res = await fetch(`${BASE_URL}/videos/${id}`, {
    headers: { Cookie: cookie },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch video");
  return res.json();
};

export const getChannelAnalytics = async (days = 30) => {
  const cookie = await getAuthCookie();
  if (!cookie) return null;

  const res = await fetch(`${BASE_URL}/dashboard/analytics?days=${days}`, {
    headers: { Cookie: cookie },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
};

export const getGlobalTrending = async () => {
  const cookie = await getAuthCookie();

  const res = await fetch(`${BASE_URL}/videos/trending`, {
    headers: cookie ? { Cookie: cookie } : {},
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch global trending videos");
  return res.json();
};