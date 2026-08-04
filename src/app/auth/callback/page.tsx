"use client"
import { useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import { useLoading } from "@/context/LoadingContext"

export default function AuthCallback() {
  const router = useRouter()
  const auth = useContext(AuthContext)
  const { showLoading, hideLoading } = useLoading()

  useEffect(() => {
    const init = async () => {
      showLoading()
      await auth?.refreshUser()
      router.push("/")
      hideLoading()
    }
    init()
  }, [])

  // Return null since the LoadingOverlay at root level handles the visual
  return null
}