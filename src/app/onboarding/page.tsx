"use client";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { postUserPreferences } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Nepali", value: "ne" },
  { label: "Hindi", value: "hi" },
];

const RATINGS = [
  { label: "G", value: "G" },
  { label: "PG", value: "PG" },
  { label: "PG-13", value: "PG-13" },
  { label: "R", value: "R" },
  { label: "NC-17", value: "NC-17" },
];

export default function Onboarding() {
  const [steps, setSteps] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast.success("Your preferences have been saved!");
        router.push("/");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting user preferences:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchTags();
  }, []);

  return (
    <div className="mt-3">
      <Container>
        <Heading
          text="Welcome to Cinematra"
          className="font-headline text-red-text text-[32px]"
        />
        <p className="text-primary-text text-[18px]">
          Answer these few questions to get started!
        </p>

        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 w-12 rounded-full ${
                s <= steps ? "bg-red-text" : "bg-primary-text/20"
              }`}
            />
          ))}
        </div>

        <div className="mt-6">
          {steps === 1 && (
            <div>
              <Heading
                text="What genres do you enjoy?"
                className="font-headline text-primary-text text-[24px]"
              />
              <p className="text-primary-text text-[16px] mt-2">
                Select all that apply
              </p>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 mt-5">
                {genres.map((genre) => (
                  <Button
                    key={genre.id}
                    variant={
                      selectedGenres.includes(genre.id) ? "primary" : "tertiary"
                    }
                    onClick={() => toggleGenre(genre.id)}
                  >
                    {genre.name}
                  </Button>
                ))}
              </div>
              {selectedGenres.length > 0 && (
                <p className="text-sm text-primary-text mt-3">
                  {selectedGenres.length} selected
                </p>
              )}
            </div>
          )}

          {steps === 2 && (
            <div>
              <Heading
                text="Any specific interests?"
                className="font-headline text-primary-text text-[24px]"
              />
              <p className="text-primary-text text-[16px] mt-2">
                Select all that apply
              </p>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 mt-5">
                {tags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant={
                      selectedTags.includes(tag.id) ? "primary" : "tertiary"
                    }
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <p className="text-sm text-primary-text mt-3">
                  {selectedTags.length} selected
                </p>
              )}
            </div>
          )}

          {steps === 3 && (
            <div className="flex flex-col gap-8">
              <div>
                <Heading
                  text="Preferred language?"
                  className="font-headline text-primary-text text-[24px]"
                />
                <p className="text-primary-text text-[16px] mt-2">
                  Select all that apply
                </p>
                <div className="flex gap-4 mt-5 flex-wrap">
                  {LANGUAGES.map((lang) => (
                    <Button
                      key={lang.value}
                      variant={
                        selectedLanguages.includes(lang.value)
                          ? "primary"
                          : "tertiary"
                      }
                      onClick={() => toggleLanguage(lang.value)}
                    >
                      {lang.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Heading
                  text="Content rating?"
                  className="font-headline text-primary-text text-[24px]"
                />
                <p className="text-primary-text text-[16px] mt-2">
                  Select what you're comfortable with
                </p>
                <div className="flex gap-4 mt-5 flex-wrap">
                  {RATINGS.map((rating) => (
                    <Button
                      key={rating.value}
                      variant={
                        selectedRatings.includes(rating.value)
                          ? "primary"
                          : "tertiary"
                      }
                      onClick={() => toggleRating(rating.value)}
                    >
                      {rating.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <div>
              {steps > 1 && (
                <Button variant="secondary" onClick={() => setSteps(steps - 1)}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              {steps < 3 && (
                <Button variant="secondary" onClick={() => setSteps(steps + 1)}>
                  Skip
                </Button>
              )}
              {steps < 3 ? (
                <Button
                  variant="primary"
                  onClick={() => setSteps(steps + 1)}
                  disabled={steps === 1 && selectedGenres.length === 0}
                >
                  Next
                </Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Finishing..." : "Finish"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
