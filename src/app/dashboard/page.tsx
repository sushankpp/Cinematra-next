import { ReactionsChart } from "@/components/charts/reactionsChart";
import { SubscriberChart } from "@/components/charts/subscriberChart";
import { SummaryChart } from "@/components/charts/summaryChart";
import { ViewsChart } from "@/components/charts/viewsChart";
import { getChannelAnalytics } from "@/lib/serverApi";
import {
  Calendar,
  BarChart2,
  TrendingUp,
  Users2,
  PlaySquare,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function Dashboard() {
  const analytics = await fetchChannelAnalytics();

  if (!analytics) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen text-white bg-black flex flex-col items-center justify-center text-center">
        <div className="bg-[#121214] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl flex flex-col items-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            Unable to Load Analytics
          </h2>

          <p className="text-sm text-white/60">
            We couldn't retrieve your channel metrics. This might happen if you
            are not logged in or if the server is temporarily unreachable.
          </p>
          <div className="flex gap-3 pt-2 w-full">
            <Link href="/dashboard" className="flex-1">
              <Button
                variant="primary"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                text="Try Again"
                icon={<RotateCcw className="w-4 h-4" />}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const views_over_time = analytics?.views_over_time || [];
  const subs_over_time = analytics?.subs_over_time || [];
  const reactions_over_time = analytics?.reactions_over_time || [];
  const summary = analytics?.summary || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen text-white bg-black">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <BarChart2 className="w-8 h-8 text-red-500" />
            Channel Dashboard
          </h1>
          <p className="text-white/60 text-sm mt-1.5 font-medium">
            Monitor your video metrics, subscriber counts, and engagement
            history in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="flex items-center gap-1.5 bg-[#121214] border border-white/5 px-3.5 py-2 rounded-xl text-xs text-white/70 font-semibold shadow-inner">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            <span>Last 30 Days</span>
          </div>
          <Link href="/dashboard/upload">
            <Button
              variant="primary"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all"
              text="Upload Video"
              icon={<PlaySquare className="w-4 h-4" />}
            />
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold tracking-tight text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-red-500" />
          Overview Metrics
        </h2>
        <SummaryChart data={summary} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#121214]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Views Over Time
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Daily watch activity & reach
              </p>
            </div>
            <div className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-semibold">
              Views
            </div>
          </div>
          <div className="w-full">
            <ViewsChart data={views_over_time} />
          </div>
        </div>

        <div className="bg-[#121214]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Subscriber Growth
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Daily subscription changes
              </p>
            </div>
            <div className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-semibold">
              Subscribers
            </div>
          </div>
          <div className="w-full">
            <SubscriberChart data={subs_over_time} />
          </div>
        </div>
      </div>

      <div className="bg-[#121214]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 shadow-xl shadow-black/40">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Users2 className="w-5 h-5 text-red-500" />
              Viewer Engagement & Reactions
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Comparison of positive vs negative feedback (Likes/Dislikes)
            </p>
          </div>
          <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-semibold">
            Reactions
          </div>
        </div>
        <div className="w-full">
          <ReactionsChart data={reactions_over_time} />
        </div>
      </div>
    </div>
  );
}

const fetchChannelAnalytics = async () => {
  try {
    return await getChannelAnalytics();
  } catch (error) {
    console.error("Error fetching channel analytics:", error);
    return null;
  }
};
