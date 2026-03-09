import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { VideoCard } from "../components/VideoCard";
import { SAMPLE_VIDEOS, type SampleVideo } from "../data/sampleVideos";
import { useGetFeed } from "../hooks/useQueries";

// Generate an infinite-feeling list by repeating sample videos
function buildInfiniteVideoList(count = 60): SampleVideo[] {
  const result: SampleVideo[] = [];
  for (let i = 0; i < count; i++) {
    const src = SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length];
    result.push({ ...src, id: `${src.id}-loop-${i}` });
  }
  return result;
}

const INFINITE_VIDEOS = buildInfiniteVideoList(60);

export function HomePage() {
  const { data: videos, isLoading } = useGetFeed(0, 20);
  const feedRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasUploadedVideos = videos && videos.length > 0;
  const _displayVideos = hasUploadedVideos ? videos : INFINITE_VIDEOS;

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
      {hasUploadedVideos
        ? (videos as { id: string }[]).map((item, index) => (
            <VideoCard
              key={item.id}
              video={item as Parameters<typeof VideoCard>[0]["video"]}
              index={index}
              isActive={index === activeIndex}
            />
          ))
        : INFINITE_VIDEOS.map((item, index) => (
            <VideoCard
              key={item.id}
              sampleVideo={item}
              index={index}
              isActive={index === activeIndex}
            />
          ))}
    </div>
  );
}
