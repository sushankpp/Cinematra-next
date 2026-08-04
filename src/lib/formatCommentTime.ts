export const formatCommentTime = (timestamp: string) => {
  if (timestamp === "Just now") return timestamp;

  // Ensure timestamps without timezone info are treated as UTC
  let normalizedTimestamp = timestamp;
  if (!/Z|[+-]\d{2}:\d{2}$/.test(timestamp)) {
    normalizedTimestamp = timestamp + "Z";
  }

  const commentDate = new Date(normalizedTimestamp);
  if (Number.isNaN(commentDate.getTime())) return timestamp;

  const diff = Date.now() - commentDate.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "Just now";

  if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }

  if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (diff < day * 2) return "1 day ago";

  return commentDate.toLocaleDateString("en-US");
};