export const CommentModerationLabels = (moderationLabel: string | undefined) => {
  switch (moderationLabel) {
    case "Safe":
      return "text-green-700 bg-green-100";

    case "PotentiallyProblematic":
      return "text-yellow-700 bg-yellow-100";

    case "Problematic":
      return "text-red-100 bg-red-500";

    default:
      return "text-gray-700 bg-gray-100";
  }
};
