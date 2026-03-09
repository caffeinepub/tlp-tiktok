import { Input } from "@/components/ui/input";
import { Hash, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SAMPLE_VIDEOS, formatCount } from "../data/sampleVideos";

const TRENDING_TAGS = [
  { tag: "tlptiktok", count: "2.8M" },
  { tag: "viral", count: "12.4M" },
  { tag: "trending", count: "8.1M" },
  { tag: "fyp", count: "45.2M" },
  { tag: "nature", count: "3.2M" },
  { tag: "adventure", count: "1.9M" },
  { tag: "beautiful", count: "5.5M" },
  { tag: "explore", count: "4.1M" },
];

export function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = SAMPLE_VIDEOS.filter(
    (v) =>
      !searchQuery ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="min-h-dvh pb-20 pt-14"
      style={{ background: "oklch(0.08 0 0)" }}
    >
      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 right-0 z-30 px-4 pt-12 pb-3"
        style={{
          background: "oklch(0.08 0 0 / 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.20 0.02 300 / 0.5)",
        }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            data-ocid="discover.search_input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos, users, hashtags..."
            className="pl-10 bg-muted border-border/40 rounded-full h-10 text-sm"
          />
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Trending hashtags */}
        {!searchQuery && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-tlp-pink" />
              <h2 className="font-display font-bold text-foreground">
                Trending
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TAGS.map((item, i) => (
                <motion.button
                  key={item.tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: "oklch(0.18 0.01 300)",
                    border: "1px solid oklch(0.25 0.02 300)",
                    color: "oklch(0.85 0.02 300)",
                  }}
                  onClick={() => setSearchQuery(item.tag)}
                >
                  <Hash className="w-3 h-3 text-tlp-pink" />
                  {item.tag}
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {/* Video grid */}
        <section>
          {!searchQuery && (
            <h2 className="font-display font-bold text-foreground mb-3">
              Discover Videos
            </h2>
          )}
          {filteredVideos.length === 0 ? (
            <div
              data-ocid="discover.empty_state"
              className="flex flex-col items-center justify-center py-20 gap-3"
            >
              <Search className="w-12 h-12 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground font-medium">
                No results for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-0.5">
              {filteredVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-[9/16] overflow-hidden bg-muted cursor-pointer group"
                  data-ocid={`discover.video.item.${i + 1}`}
                >
                  {/* Thumbnail using video preview */}
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="thumbnail-overlay absolute inset-0" />

                  {/* View count */}
                  <div className="absolute bottom-1 left-1 flex items-center gap-0.5">
                    <span className="text-white text-xs font-semibold drop-shadow">
                      ▶ {formatCount(video.views)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
