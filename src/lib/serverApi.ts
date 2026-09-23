import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getAuthCookie(): Promise<string> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    return token ? `token=${token.value}` : "";
  } catch {
    return "";
  }
}

interface ServerFetchOptions extends RequestInit {
  revalidate?: number;
  requireAuth?: boolean;
}

async function serverFetch<T = any>(
  endpoint: string,
  fallback: T,
  options: ServerFetchOptions = {}
): Promise<T> {
  const { revalidate = 60, requireAuth = false, ...fetchOptions } = options;

  const cookie = await getAuthCookie();
  if (requireAuth && !cookie) return fallback;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        ...(cookie ? { Cookie: cookie } : {}),
        ...fetchOptions.headers,
      },
      next: { revalidate },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
      return fallback;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return fallback;
  }
}

export const getRecommendations = async () => {
  const videos = await serverFetch<any[]>("/videos/recommendations", [], {
    requireAuth: true,
    revalidate: 30,
  });

  if (!Array.isArray(videos)) {
    return [];
  }

  return [...videos].sort((a, b) => {
    const scoreA = Number(a?.similarity_score ?? a?.similarityScore ?? 0);
    const scoreB = Number(b?.similarity_score ?? b?.similarityScore ?? 0);
    return scoreB - scoreA;
  });
};

export const getPersonalTrending = async () => {
  return serverFetch<any[]>("/videos/trending/me", [], {
    requireAuth: true,
    revalidate: 30,
  });
};

export const getChannels = async () => {
  return serverFetch<any[]>("/channels", [], {
    requireAuth: true,
    revalidate: 60,
  });
};

export const getVideos = async () => {
  return serverFetch<any[]>("/videos", [], {
    requireAuth: false,
    revalidate: 0,
  });
};

export const getVideo = async (id: string) => {
  return serverFetch<any>(`/videos/${id}`, null, {
    requireAuth: false,
    revalidate: 60,
  });
};

export const getChannelAnalytics = async (days = 30) => {
  return serverFetch<any>(`/dashboard/analytics?days=${days}`, null, {
    requireAuth: true,
    revalidate: 60,
  });
};

export const getGlobalTrending = async () => {
  return serverFetch<any[]>("/videos/trending", [], {
    requireAuth: false,
    revalidate: 60,
  });
};