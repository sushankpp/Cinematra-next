import { supabase } from "@/lib/supabase";
import { GenreFormDB, TagFromDB } from "@/types/components/ui/videoCard.types";

let cachedGenres: GenreFormDB[] | null = null;
let cachedTags : TagFromDB[] | null = null;

export async function getGenresAndTags() {
    if(cachedGenres && cachedTags) {
        return { genres: cachedGenres, tags: cachedTags };
    }

    const [genresRes, tagsRes] = await Promise.all([
        cachedGenres ? Promise.resolve({ data: cachedGenres, error: null}) : supabase.from("genres").select("*").order("name", { ascending: true }),
        cachedTags ? Promise.resolve({ data: cachedTags, error: null}) : supabase.from("tags").select("*").order("name", { ascending: true }),
    ]);

    if (genresRes.data) cachedGenres = genresRes.data;
    if (tagsRes.data) cachedTags = tagsRes.data;

    return {
        genres: genresRes.data || [],
        tags: tagsRes.data || [],
    };
}