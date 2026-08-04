import { VolumeX, Volume, Volume1, Volume2 } from "lucide-react";

export const getVolumeIcon = (volume: number, size = 20) => {
  if (volume === 0) return <VolumeX size={size} />;
  if (volume < 0.5) return <Volume1 size={size} />;
  return <Volume2 size={size} />;
};
