import { useEffect, useRef, useState } from "react";

export function useVideoPlayer(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playerFocused, setPlayerFocused] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const handleFullScreen = () => {
    if (!containerRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  const formatDisplay = (s: number) => {
    const mins = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${sec}`;
  };

  const formatISO = (s: number) => {
    const mins = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `PT${mins}M${sec}S`;
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    const handleMetadata = () => setDuration(video.duration);
    document.addEventListener("loadedmetadata", handleMetadata);

    return () => document.removeEventListener("loadedmetadata", handleMetadata);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerFocused) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowRight":
          video.currentTime = Math.min(video.currentTime + 5, duration);
          break;
        case "ArrowLeft":
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1);
          setVolume(video.volume);
          break;
        case "ArrowDown":
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          setVolume(video.volume);
          break;
        case "KeyF":
          handleFullScreen();
          break;
        case "KeyM":
          video.muted = !video.muted;
          setVolume(video.muted ? 0 : video.volume);
          break;
        default:
          break;
      }
    };

    video.addEventListener("keydown", handleKeyDown);
    return () => video.removeEventListener("keydown", handleKeyDown);
  }, [duration, isPlaying, volume, playerFocused]);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (!video) return;

    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const time = percentage * duration;

    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current || !videoRef.current) return;

    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;

    videoRef.current.volume = percentage;
    setVolume(percentage);
  };

  const handleVolumeDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleVolume(e);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleVolume(e as unknown as React.MouseEvent<HTMLDivElement>);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleSeek(e);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleSeek(e as unknown as React.MouseEvent<HTMLDivElement>);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return {
    videoRef,
    progressRef,
    volumeRef,
    containerRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    fullScreen,
    playerFocused,
    setPlayerFocused,
    handlePlayPause,
    handleSeek,
    handleMouseDown,
    handleVolume,
    handleVolumeDown,
    handleFullScreen,
    formatDisplay,
    formatISO,
    setDuration,
    setCurrentTime,
    setIsPlaying,
  };
}
