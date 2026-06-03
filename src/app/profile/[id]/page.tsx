"use client";
import { authService } from "@/services/auth.service";
import { User } from "@/types/context/authContext.types";
import { Camera, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/ui/FormField";


export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    picture: "", first_name: "", last_name: "", phone: "",
  });

  useEffect(() => {
    authService.me().then(({ data }) => {
      if (!data?.user) return;
      const u = data.user;
      setUser(u);
      setFormData({
        picture:     u.picture    || "",
        first_name:  u.first_name || "",
        last_name:   u.last_name  || "",
        phone:       u.phone      || "",
      });
    }).catch(() => toast.error("Failed to load profile"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData((prev) => ({
      ...prev, picture: String(reader.result || ""),
    }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const { data, error } = await authService.updateProfile(formData);
    if (error) { toast.error("Failed to update profile"); return; }
    setUser(data!.user);  
    toast.success("Profile updated successfully!");
  };

  const previewSrc = formData.picture || "https://placehold.co/200x200";

  return (
    <section className="min-h-screen bg-neutral-default text-primary-text font-body py-14 px-4">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-neutral-Shade border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

          <div className="h-40 bg-gradient-to-r from-red-500/70 via-tertiary-default to-neutral-default" />

          <div className="px-8 pb-10">
            {/* avatar */}
            <div className="relative w-fit -mt-16">
              <img src={previewSrc} alt="profile"
                className="w-32 h-32 rounded-full border-4 border-neutral-default object-cover" />
              <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-red-500
                                flex items-center justify-center hover:scale-105 transition cursor-pointer">
                <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                <Camera size={18} className="text-white pointer-events-none" />
              </label>
            </div>

            {/* heading */}
            <div className="mt-5">
              <h1 className="font-headline text-4xl">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-tertiary-Shade mt-2">Manage your account information</p>
            </div>

            {/* form */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <FormField label="First Name"  name="first_name" value={formData.first_name} onChange={handleChange} />
              <FormField label="Last Name"   name="last_name"  value={formData.last_name}  onChange={handleChange} />
              <FormField label="Phone"       name="phone"      value={formData.phone}       onChange={handleChange} placeholder="Enter phone number" />
              <FormField label="Email"       value={user?.email    || ""} disabled />
              <FormField label="Provider"    value={user?.provider || ""} disabled />
              <FormField label="Created"     value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ""} disabled />
              <FormField label="Updated"     value={user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : ""} disabled />
            </div>

            {/* actions */}
            <div className="flex justify-end mt-10 gap-4">
              <button
                className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
                onClick={() => setFormData({ picture: user?.picture || "", first_name: user?.first_name || "", last_name: user?.last_name || "", phone: user?.phone || "" })}
              >
                Cancel
              </button>
              <button onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-red-500 hover:opacity-90 transition flex items-center gap-2">
                <Pencil size={16} /> Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}