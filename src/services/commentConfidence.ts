export const CommentModerationConfidence = (moderationConfidence?: number | undefined) => {
  if (moderationConfidence === undefined) {
    return "text-gray-700 bg-gray-100";
  }

  const confidence = Math.floor(moderationConfidence * 100);

  if (confidence >= 90) {
    return "text-green-800 bg-green-200";
  }

  if (confidence >= 80) {
    return "text-green-700 bg-green-100";
  }

  if (confidence >= 70) {
    return "text-yellow-700 bg-yellow-100";
  }

  if (confidence >= 50) {
    return "text-orange-700 bg-orange-100";
  }

  return "text-red-700 bg-red-100";
};
