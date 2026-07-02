import {
  Play,
  UserPlus,
  Clapperboard,
  Heart,
  HeartOff,
  Timer,
} from "lucide-react";

export const SummaryChart = ({
  data,
}: {
  data: {
    avg_completion: number;
    total_dislikes: number;
    total_likes: number;
    total_subscribers: number;
    total_videos: number;
    total_views: number;
  }[];
}) => {
  const summary = data[0];
  if (!summary) return null;

  const cards = [
    {
      label: "Total Views",
      value: summary.total_views,
      description: "Total content views",
      icon: Play,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "hover:border-amber-500/30",
    },
    {
      label: "Subscribers",
      value: summary.total_subscribers,
      description: "Active channel fans",
      icon: UserPlus,
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "hover:border-violet-500/30",
    },
    {
      label: "Total Videos",
      value: summary.total_videos,
      description: "Published video files",
      icon: Clapperboard,
      iconColor: "text-teal-400",
      bgColor: "bg-teal-500/10",
      borderColor: "hover:border-teal-500/30",
    },
    {
      label: "Likes",
      value: summary.total_likes,
      description: "Positive reader reactions",
      icon: Heart,
      iconColor: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "hover:border-rose-500/30",
    },
    {
      label: "Dislikes",
      value: summary.total_dislikes,
      description: "Negative user feedback",
      icon: HeartOff,
      iconColor: "text-zinc-400",
      bgColor: "bg-zinc-500/10",
      borderColor: "hover:border-zinc-500/30",
    },
    {
      label: "Avg. Completion",
      value: `${Math.round(summary.avg_completion * 100)}%`,
      description: "Audience retention rate",
      icon: Timer,
      iconColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "hover:border-cyan-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="w-full bg-[#0a0a0c] border border-white/[0.08] rounded-xl p-6 hover:bg-[#121215] hover:border-white/15 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-white/45 text-[11px] font-bold uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-white text-3xl font-extrabold font-headline tracking-tight pt-1.5">
                  {typeof card.value === "number"
                    ? card.value.toLocaleString()
                    : card.value}
                </p>
                <p className="text-white/30 text-xs font-normal pt-1.5">
                  {card.description}
                </p>
              </div>
              <div className={`${card.iconColor} pt-0.5`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
