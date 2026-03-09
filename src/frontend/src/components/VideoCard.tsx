import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ExternalLink,
  Heart,
  MessageCircle,
  Music2,
  Play,
  Share2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  SAMPLE_VIDEOS,
  type SampleVideo,
  formatCount,
} from "../data/sampleVideos";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import type { Video } from "../hooks/useQueries";
import { useLikeVideo } from "../hooks/useQueries";
import { CommentsSheet } from "./CommentsSheet";

interface VideoCardProps {
  video?: Video;
  sampleVideo?: SampleVideo;
  index: number;
  isActive: boolean;
}

export function VideoCard({
  video,
  sampleVideo,
  index,
  isActive,
}: VideoCardProps) {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const likeMutation = useLikeVideo();
  const { identity } = useInternetIdentity();

  const title = video?.title ?? sampleVideo?.title ?? "Amazing Video";
  const description = video?.description ?? sampleVideo?.description ?? "";
  const username = sampleVideo?.username ?? "@user";
  const likeCount = video ? Number(video.likes) : (sampleVideo?.likes ?? 0);
  const commentCount = sampleVideo?.comments ?? 0;
  const shareCount = sampleVideo?.shares ?? 0;
  const music = sampleVideo?.music ?? "🎵 Original Sound";
  const videoId = video?.id ?? sampleVideo?.id ?? `sample-${index}`;

  // YouTube ID and thumbnail
  const youtubeId = sampleVideo?.youtubeId ?? null;
  const youtubeUrl = youtubeId
    ? `https://www.youtube.com/watch?v=${youtubeId}`
    : (sampleVideo?.videoUrl ?? null);

  // For uploaded videos - direct URL
  const uploadedVideoUrl = video?.videoBlob
    ? video.videoBlob.getDirectURL()
    : null;

  // Thumbnail: try maxresdefault, fallback to hqdefault
  const primaryThumb = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null;
  const fallbackThumb = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : null;
  const thumbnailSrc = imgError ? fallbackThumb : primaryThumb;

  const handleDoubleTap = useCallback(() => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
    if (!liked) {
      setLiked(true);
      if (identity && video) {
        likeMutation.mutate(videoId);
      }
    }
  }, [liked, identity, video, videoId, likeMutation]);

  const handleLike = useCallback(() => {
    if (!identity) {
      toast.error("لائک کرنے کے لیے لاگ ان کریں");
      return;
    }
    setLiked((prev) => !prev);
    if (!liked && video) {
      likeMutation.mutate(videoId);
    }
  }, [identity, liked, video, videoId, likeMutation]);

  const handleShare = useCallback(() => {
    const shareUrl = youtubeUrl ?? window.location.href;
    if (navigator.share) {
      navigator
        .share({ title, text: description, url: shareUrl })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("لنک کاپی ہو گیا!");
        })
        .catch(() => {});
    }
  }, [title, description, youtubeUrl]);

  const handleOpenYoutube = useCallback(() => {
    if (youtubeUrl) {
      window.open(youtubeUrl, "_blank", "noopener,noreferrer");
    }
  }, [youtubeUrl]);

  const dataOcidIndex = index + 1;

  return (
    <div
      className="video-item bg-black relative select-none"
      data-ocid={`feed.video.item.${dataOcidIndex}`}
      onDoubleClick={handleDoubleTap}
    >
      {/* Uploaded video - direct play */}
      {uploadedVideoUrl ? (
        <video
          src={uploadedVideoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          autoPlay={isActive}
          playsInline
          preload="auto"
        >
          <track kind="captions" />
        </video>
      ) : thumbnailSrc ? (
        /* YouTube video - show thumbnail with play button overlay */
        <>
          <img
            src={thumbnailSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          {/* Play button overlay - tapping opens YouTube */}
          <motion.button
            className="absolute inset-0 flex items-center justify-center z-10 w-full h-full"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenYoutube();
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="YouTube پر چلائیں"
            data-ocid={`feed.play_button.${dataOcidIndex}`}
          >
            {/* Center play button */}
            <motion.div
              animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  background: "oklch(0.65 0.28 350 / 0.9)",
                  boxShadow: "0 0 40px oklch(0.65 0.28 350 / 0.6)",
                }}
              >
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
              <div
                className="flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold"
                style={{ background: "oklch(0.1 0 0 / 0.7)" }}
              >
                <ExternalLink className="w-3 h-3" />
                <span>YouTube پر دیکھیں</span>
              </div>
            </motion.div>
          </motion.button>
        </>
      ) : (
        /* Fallback gradient background */
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.15 0.08 145), oklch(0.08 0 0))",
          }}
        />
      )}

      {/* Gradients */}
      <div className="absolute inset-0 video-gradient-top pointer-events-none" />
      <div className="absolute inset-0 video-gradient-bottom pointer-events-none" />

      {/* Double-tap heart */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <Heart className="w-24 h-24 fill-tlp-pink text-tlp-pink drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top logo */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-16 pointer-events-none z-20">
        <h1 className="font-display font-black text-xl text-white tlp-logo-glow pointer-events-auto select-none">
          tlp<span className="text-white ml-1">TikTok</span>
        </h1>
      </div>

      {/* Right sidebar actions */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-20">
        {/* Avatar */}
        <div className="relative mb-2">
          <Avatar className="w-12 h-12 ring-2 ring-white">
            <AvatarFallback
              className="font-bold text-sm"
              style={{
                background: "oklch(0.65 0.28 350 / 0.8)",
                color: "white",
              }}
            >
              {username.slice(1, 3).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "oklch(0.65 0.28 350)" }}
          >
            +
          </div>
        </div>

        {/* Like */}
        <motion.button
          data-ocid={`feed.like_button.${dataOcidIndex}`}
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          whileTap={{ scale: 0.85 }}
          className="flex flex-col items-center gap-1"
          aria-label="Like video"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <Heart
              className={`w-8 h-8 transition-all duration-200 drop-shadow-lg ${liked ? "fill-tlp-pink text-tlp-pink scale-110" : "text-white"}`}
            />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">
            {formatCount(liked ? likeCount + 1 : likeCount)}
          </span>
        </motion.button>

        {/* Comment */}
        <motion.button
          data-ocid={`feed.comment_button.${dataOcidIndex}`}
          onClick={(e) => {
            e.stopPropagation();
            setCommentsOpen(true);
          }}
          whileTap={{ scale: 0.85 }}
          className="flex flex-col items-center gap-1"
          aria-label="Open comments"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">
            {formatCount(commentCount)}
          </span>
        </motion.button>

        {/* Share */}
        <motion.button
          data-ocid={`feed.share_button.${dataOcidIndex}`}
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
          whileTap={{ scale: 0.85 }}
          className="flex flex-col items-center gap-1"
          aria-label="Share video"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <Share2 className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">
            {formatCount(shareCount)}
          </span>
        </motion.button>

        {/* Music disc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-10 h-10 rounded-full border-4 flex items-center justify-center"
          style={{
            borderColor: "oklch(0.65 0.28 350)",
            background:
              "radial-gradient(circle, oklch(0.65 0.28 350 / 0.3), oklch(0.08 0 0))",
          }}
        >
          <Music2 className="w-4 h-4 text-white" />
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-20 left-4 right-20 z-20">
        <p className="text-white font-bold text-sm mb-1 drop-shadow">
          {username}
        </p>
        <p className="text-white/90 text-sm leading-relaxed line-clamp-2 drop-shadow">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Music2 className="w-3 h-3 text-white/80 flex-shrink-0" />
          <p className="text-white/80 text-xs truncate">{music}</p>
        </div>
      </div>

      {/* Comments Sheet */}
      <CommentsSheet
        open={commentsOpen}
        onOpenChange={setCommentsOpen}
        videoId={videoId}
        videoTitle={title}
      />
    </div>
  );
}
