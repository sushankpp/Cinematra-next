"use client";
import { postUserPreferences } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

type Genre = {
  id: number;
  name: string;
  slug: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
};

export function useOnboarding() {
  const [steps, setSteps] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refreshUser } = useAuth();
  const router = useRouter();

  const fetchGenres = async () => {
    const { data, error } = await supabase.from("genres").select("*");
    if (error) {
      console.error("Error fetching genres:", error);
      return;
    }
    setGenres(data ?? []);
  };

  const fetchTags = async () => {
    const { data, error } = await supabase.from("tags").select("*");
    if (error) {
      console.error("Error fetching tags:", error);
      return;
    }
    setTags(data ?? []);
  };

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const toggleLanguage = (value: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(value) ? prev.filter((l) => l !== value) : [...prev, value],
    );
  };

  const toggleRating = (value: string) => {
    setSelectedRatings((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const handleSubmit = async () => {
    const payload = JSON.stringify({
      preferred_genres: selectedGenres,
      preferred_tags: selectedTags,
      preferred_languages: selectedLanguages,
      preferred_ratings: selectedRatings,
    });

    console.log("Submitting preferences:", payload);
    setIsSubmitting(true);
    try {
      const res = await postUserPreferences(payload);
      if (res.success) {
        await refreshUser();
        toast.success("Your preferences have been saved!");
        router.push("/");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting user preferences:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchTags();
  }, []);

  return {
    steps,
    setSteps,
    genres,
    tags,
    selectedGenres,
    selectedTags,
    selectedLanguages,
    selectedRatings,
    toggleGenre,
    toggleTag,
    toggleLanguage,
    toggleRating,
    handleSubmit,
    isSubmitting,
  };
}
