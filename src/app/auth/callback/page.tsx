"use client"
import { useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"

export default function AuthCallback() {
  const router = useRouter()
  const auth = useContext(AuthContext)

  useEffect(() => {
    auth?.refreshUser()
    router.push("/")
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-white">Completing login...</p>
    </div>
  )
}