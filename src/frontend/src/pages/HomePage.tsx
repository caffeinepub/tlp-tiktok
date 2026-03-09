import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { VideoCard } from "../components/VideoCard";
import { SAMPLE_VIDEOS } from "../data/sampleVideos";
import { useGetFeed } from "../hooks/useQueries";

export function HomePage() {
  const { data: videos, isLoading } = useGetFeed(0, 20);
  const feedRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const usingSampleVideos = !videos || videos.length === 0;
  const displayVideos = usingSampleVideos ? SAMPLE_VIDEOS : videos;

  const handleScroll = useCallback(() => {
    const container = feedRef.current;
    if (!container) return;
    const height = container.clientHeight;
    const scrollTop = container.scrollTop;
    const newIndex = Math.round(scrollTop / height);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const container = feedRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) {
    return (
      <div className="h-dvh bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-sm px-4 space-y-3">
          <Skeleton className="h-full w-full aspect-[9/16] rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div ref={feedRef} className="video-feed pb-16" aria-label="Video feed">
      {displayVideos.map((item, index) => {
        const isSample = usingSampleVideos;
        return (
          <VideoCard
            key={
              isSample
                ? (item as (typeof SAMPLE_VIDEOS)[0]).id
                : (item as { id: string }).id
            }
            video={
              isSample
                ? undefined
                : (item as Parameters<typeof VideoCard>[0]["video"])
            }
            sampleVideo={
              isSample ? (item as (typeof SAMPLE_VIDEOS)[0]) : undefined
            }
            index={index}
            isActive={index === activeIndex}
          />
        );
      })}
    </div>
  );
}
