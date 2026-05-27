"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export function useVideoPlayer(src: string, videoId?: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playerFocused, setPlayerFocused] = useState(false);
  const [currentQuality, setCurrentQuality] = useState(-1);
  const [availableQualities, setAvailableQualities] = useState<
    { index: number; label: string; bitrate: number }[]
  >([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  // HLS js integrations for .m3u8 files
  useEffect(() => {
    const video = videoRef.current;

    if (!video || !src) return;

    hlsRef.current?.destroy();

    if (src.includes(".m3u8") && Hls.isSupported()) {
      const hls = new Hls({
        startLevel: 1, // start at 720p
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        abrEwmaDefaultEstimate: 2500000, //assume 2.25Mbps connection initially
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const qualities = data.levels.map((level, index) => ({
          index,
          label: `${level.height}p`,
          bitrate: level.bitrate,
        }));
        setAvailableQualities(qualities);
        setCurrentQuality(1); //default to 720p
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentQuality(data.level);
      });
    } else if (
      src.includes(".m3u8") &&
      video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = src; // for safari , HLS is natively supported
    } else {
      video.src = src; // for regular mp4 videos
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [src]);

  //BOLA quality switching
  useEffect(() => {
    if (!videoId || !hlsRef.current || currentQuality != -1) return;

    const interval = setInterval(async () => {
      const video = videoRef.current;
      if (!video) return;

      const bufferLevel =
        video.buffered.length > 0
          ? video.buffered.end(0) - video.currentTime
          : 0;

      try {
        const res = await fetch(
          `${BASE_URL}/videos/${videoId}/stream-info?buffer=${bufferLevel}`,
        );
        const data = await res.json();

        if (hlsRef.current && currentQuality != -1) {
          hlsRef.current.currentLevel = data.quality_index;
          hlsRef.current.loadLevel = data.quality_index; // set load level to avoid auto switching by hls.js based on its own estimation
          hlsRef.current.nextLevel = data.quality_index; // set next level to avoid auto switching by hls.js
        }
      } catch (error) {
        console.error("Failed to fetch quality prediction", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [videoId, currentQuality]);

  const changeQuality = (index: number) => {
    if (!hlsRef.current) return;

    if (index === -1) {
      hlsRef.current.currentLevel = -1;
      setCurrentQuality(-1);
    } else {
      hlsRef.current.currentLevel = index;
      hlsRef.current.loadLevel = index;
      setCurrentQuality(index);
    }
  };

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
    video.addEventListener("loadedmetadata", handleMetadata);

    return () => video.removeEventListener("loadedmetadata", handleMetadata);
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
    currentQuality,
    availableQualities,
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
    changeQuality,
  };
}
