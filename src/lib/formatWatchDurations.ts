export const getProgressPercent = (watched: number, total: number) => {
  if (!total || total <= 0) return 0;
  return Math.min(100, Math.max(0, (watched / total) * 100));
};

export const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s watched`;
  return `${m}m ${s}s watched`;
};

export const formatFullDuration = (watched?: number, total?: number) => {
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = String(Math.floor(s % 60)).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const hasTotal = typeof total === "number" && total > 0;
  const hasWatched = typeof watched === "number" && watched > 0;

  if (!hasTotal && !hasWatched) return "";
  if (!hasWatched) return fmt(total!);
  if (!hasTotal) return fmt(watched!);
  return `${fmt(watched!)} / ${fmt(total!)}`;
};
