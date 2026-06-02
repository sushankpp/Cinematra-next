"use client";

import { authService } from "@/services/auth.service";
import { User } from "@/types/context/authContext.types";
import { Camera, Pencil } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await authService.me();
        if (data) {
          setUser(data.user);
          console.log("Fetched user data:", data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log(formData);
  };

  return (
    <section className="min-h-screen bg-neutral-default text-primary-text font-body py-14 px-4">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-neutral-Shade border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* top banner */}
          <div className="h-40 bg-gradient-to-r from-red-500/70 via-tertiary-default to-neutral-default relative" />

          {/* profile section */}
          <div className="px-8 pb-10 relative">
            {/* profile image */}
            <div className="relative w-fit -mt-16">
              <img
                src={user?.picture || "https://placehold.co/200x200"}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-neutral-default object-cover"
              />

              <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:scale-105 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                />
                <Camera size={18} className="text-white pointer-events-none" />
              </label>
            </div>

            {/* user heading */}
            <div className="mt-5">
              <h1 className="font-headline text-4xl">
                {user?.first_name} {user?.last_name}
              </h1>

              <p className="text-tertiary-Shade mt-2">
                Manage your account information
              </p>
            </div>

            {/* form */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  First Name
                </label>

                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  Last Name
                </label>

                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  Email
                </label>

                <input
                  disabled
                  value={user?.email || ""}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 opacity-60 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  Phone
                </label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  Login Provider
                </label>

                <input
                  disabled
                  value={user?.provider || ""}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 capitalize opacity-60"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  Account Created
                </label>

                <input
                  disabled
                  value={
                    user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : ""
                  }
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 opacity-60"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-tertiary-Shade">
                  Last Updated at
                </label>

                <input
                  disabled
                  value={
                    user?.updated_at
                      ? new Date(user.updated_at).toLocaleDateString()
                      : ""
                  }
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 opacity-60"
                />
              </div>
            </div>

            {/* actions */}
            <div className="flex justify-end mt-10 gap-4">
              <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition">
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-red-500 hover:opacity-90 transition flex items-center gap-2"
              >
                <Pencil size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
