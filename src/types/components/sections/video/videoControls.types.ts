import { useVideoPlayer } from "@/hooks/useVideoPlayer";

export type VideoControlProps = ReturnType<typeof useVideoPlayer>;

export type VideoQualitySelectorProps = {
    availableQualities: {index: number; label: string} []
    currentQuality: number;
    changeQuality: (index: number) => void;
}