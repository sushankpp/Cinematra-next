"use client"
import { getSubscriptions } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { formatCommentTime } from "@/lib/formatCommentTime"

interface Subscriber {
  id: string
  subscriber_id: string
  created_at: string
  users: {
    id: string
    first_name: string
    last_name: string
    picture: string | null
  }
}

export default function Users() {
  const { user } = useAuth()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return 
    
    getSubscriptions(user.id)
      .then(setSubscribers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.id])

  return (
    <div className="p-6 max-w-screen-xl">
      <div className="mb-6">
        <h1 className="font-headline text-2xl text-primary-text font-bold">
          Your Subscribers
        </h1>
        <p className="font-body text-tertiary-Shade text-sm mt-1">
          Here are the list of people who have subscribed to your channel.
        </p>
      </div>

      {loading ? (
        <p className="text-tertiary-Shade text-sm">Loading...</p>
      ) : subscribers.length === 0 ? (
        <p className="text-tertiary-Shade text-sm">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-primary-text">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 font-semibold">Subscriber</th>
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3">
                    <img
                      src={sub.users.picture || "/default-profile.jpg"}
                      alt={sub.users.first_name}
                      className="w-9 h-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {sub.users.first_name} {sub.users.last_name}
                  </td>
                  <td className="px-4 py-3 text-tertiary-Shade">
                    {formatCommentTime(sub.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 text-xs text-tertiary-Shade border-t border-white/10">
            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  )
}