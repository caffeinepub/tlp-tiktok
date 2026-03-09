import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Heart, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SAMPLE_COMMENTS } from "../data/sampleVideos";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddComment } from "../hooks/useQueries";

interface CommentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
  videoTitle?: string;
}

export function CommentsSheet({
  open,
  onOpenChange,
  videoId,
  videoTitle,
}: CommentsSheetProps) {
  const [text, setText] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const addComment = useAddComment();
  const { identity } = useInternetIdentity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!identity) {
      toast.error("Please login to comment");
      return;
    }
    try {
      await addComment.mutateAsync({ videoId, text: text.trim() });
      toast.success("Comment posted!");
      setText("");
    } catch {
      toast.error("Failed to post comment");
    }
  };

  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        data-ocid="comments.sheet"
        side="bottom"
        className="h-[75dvh] p-0 rounded-t-2xl"
        style={{ background: "oklch(0.12 0.005 300)", border: "none" }}
      >
        <SheetHeader className="px-4 pt-4 pb-3 border-b border-border/40">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground font-display font-bold">
              Comments{" "}
              {videoTitle && (
                <span className="text-muted-foreground text-sm font-normal ml-1">
                  on "{videoTitle}"
                </span>
              )}
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Comments list */}
        <div
          className="overflow-y-auto flex-1 px-4 py-3 space-y-4"
          style={{ maxHeight: "calc(75dvh - 130px)" }}
        >
          <AnimatePresence initial={false}>
            {SAMPLE_COMMENTS.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-3"
              >
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarFallback
                    className="text-xs font-bold"
                    style={{
                      background: "oklch(0.65 0.28 350 / 0.3)",
                      color: "oklch(0.65 0.28 350)",
                    }}
                  >
                    {comment.user.slice(1, 3).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">
                    {comment.user}
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground">
                      {comment.time} ago
                    </span>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleLike(comment.id)}
                  className="flex flex-col items-center gap-0.5 flex-shrink-0 ml-2"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${likedComments.has(comment.id) ? "fill-tlp-pink text-tlp-pink" : "text-muted-foreground"}`}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {likedComments.has(comment.id)
                      ? comment.likes + 1
                      : comment.likes}
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comment input */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-border/40 flex gap-2 items-center"
          style={{ background: "oklch(0.10 0.005 300)" }}
        >
          <Input
            data-ocid="comments.input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={identity ? "Add a comment..." : "Login to comment..."}
            disabled={!identity}
            className="flex-1 bg-muted border-border/40 text-sm h-10 rounded-full px-4"
          />
          <Button
            data-ocid="comments.submit_button"
            type="submit"
            size="icon"
            disabled={!text.trim() || addComment.isPending || !identity}
            className="h-10 w-10 rounded-full flex-shrink-0"
            style={{ background: "oklch(0.65 0.28 350)" }}
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
