const BASE_URL = "/api";

export function getGamesUrl(category: string, platform?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }

  if (platform && platform !== "both") {
    params.append("platform", platform);
  }

  return `${BASE_URL}/games?${params.toString()}`;
}

export function getGameDetailsUrl(id: number) {
  return `${BASE_URL}/game?id=${id}`;
}