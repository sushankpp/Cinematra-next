"use client";
import { postUserPreferences } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { getGenresAndTags } from "@/services/metadata.service";
import { GenreFormDB as Genre, TagFromDB as Tag } from "@/types/components/ui/videoCard.types";

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

  useEffect(() => {
    let isMounted = true;

    getGenresAndTags()
      .then(({ genres, tags }) => {
        if (isMounted) {
          setGenres(genres);
          setTags(tags);
        }
      })
      .catch((err) => {
        console.error("Failed to load genres and tags:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

    setIsSubmitting(true);
    try {
      const res = await postUserPreferences(payload);
      if (res?.success) {
        await refreshUser();
        toast.success("Your preferences have been saved!");
        router.push("/");
      } else {
        toast.error("Failed to save preferences. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting user preferences:", error);
      toast.error("An error occurred while saving your preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
