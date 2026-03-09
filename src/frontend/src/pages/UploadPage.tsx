import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Image, Loader2, Upload, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateVideo } from "../hooks/useQueries";

export function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragover, setDragover] = useState(false);
  const [success, setSuccess] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const createVideo = useCreateVideo();
  const { identity } = useInternetIdentity();

  const handleVideoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragover(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      toast.error("Please drop a video file");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to upload videos");
      return;
    }
    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }

    try {
      setUploadProgress(10);

      // Read files as bytes
      const videoBytes = new Uint8Array(await videoFile.arrayBuffer());
      setUploadProgress(30);

      let thumbnailBytes: Uint8Array<ArrayBuffer>;
      if (thumbnailFile) {
        thumbnailBytes = new Uint8Array(await thumbnailFile.arrayBuffer());
      } else {
        // Use first frame of video as thumbnail placeholder
        thumbnailBytes = new Uint8Array(0);
      }
      setUploadProgress(50);

      const videoBlob = ExternalBlob.fromBytes(videoBytes).withUploadProgress(
        (p) => {
          setUploadProgress(50 + p * 0.4);
        },
      );
      const thumbBlob =
        thumbnailBytes.length > 0
          ? ExternalBlob.fromBytes(thumbnailBytes)
          : ExternalBlob.fromURL("https://picsum.photos/400/700");

      const id = `video-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await createVideo.mutateAsync({
        id,
        title,
        description,
        videoBlob,
        thumbnailBlob: thumbBlob,
      });

      setUploadProgress(100);
      setSuccess(true);
      toast.success("Video uploaded successfully! 🎉");

      // Reset after 2s
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setVideoFile(null);
        setThumbnailFile(null);
        setUploadProgress(0);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  return (
    <div
      className="min-h-dvh pb-24 pt-14"
      style={{ background: "oklch(0.08 0 0)" }}
    >
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-30 px-4 pt-12 pb-3"
        style={{
          background: "oklch(0.08 0 0 / 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.20 0.02 300 / 0.5)",
        }}
      >
        <h1 className="font-display font-black text-xl text-foreground">
          Upload Video
        </h1>
      </div>

      <div className="px-4 pt-2 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
              data-ocid="upload.success_state"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400" />
              <p className="font-display font-bold text-xl text-foreground">
                Video Uploaded!
              </p>
              <p className="text-muted-foreground text-sm">
                Your video is being processed...
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Video drop zone */}
              <div>
                <Label className="text-sm font-semibold mb-2 block text-foreground">
                  Video File *
                </Label>
                <label
                  htmlFor="video-file-input"
                  data-ocid="upload.dropzone"
                  className={`upload-dropzone rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${dragover ? "dragover" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragover(true);
                  }}
                  onDragLeave={() => setDragover(false)}
                  onDrop={handleVideoDrop}
                  aria-label="Upload video file"
                >
                  {videoFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <Video className="w-10 h-10 text-tlp-pink" />
                      <p className="text-sm font-medium text-foreground text-center">
                        {videoFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoFile(null);
                        }}
                        className="flex items-center gap-1 text-xs text-destructive"
                      >
                        <X className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "oklch(0.65 0.28 350 / 0.15)" }}
                      >
                        <Upload className="w-8 h-8 text-tlp-pink" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">
                          Drop your video here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          or tap to browse · MP4, MOV up to 500MB
                        </p>
                      </div>
                    </>
                  )}
                </label>
                <input
                  ref={videoInputRef}
                  id="video-file-input"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                  data-ocid="upload.upload_button"
                />
              </div>

              {/* Thumbnail */}
              <div>
                <Label className="text-sm font-semibold mb-2 block text-foreground">
                  Thumbnail (optional)
                </Label>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: thumbnail trigger */}
                <div
                  className="border border-dashed border-border/60 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-tlp-pink/60 transition-colors"
                  onClick={() => thumbInputRef.current?.click()}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.72 0.18 195 / 0.15)" }}
                  >
                    <Image className="w-5 h-5 text-secondary" />
                  </div>
                  {thumbnailFile ? (
                    <span className="text-sm text-foreground truncate flex-1">
                      {thumbnailFile.name}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Choose thumbnail image
                    </span>
                  )}
                </div>
                <input
                  ref={thumbInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setThumbnailFile(e.target.files?.[0] ?? null)
                  }
                />
              </div>

              {/* Title */}
              <div>
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold mb-2 block text-foreground"
                >
                  Title *
                </Label>
                <Input
                  id="title"
                  data-ocid="upload.input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your video a catchy title..."
                  maxLength={100}
                  className="bg-muted border-border/40 rounded-xl h-11"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {title.length}/100
                </p>
              </div>

              {/* Description */}
              <div>
                <Label
                  htmlFor="desc"
                  className="text-sm font-semibold mb-2 block text-foreground"
                >
                  Description
                </Label>
                <Textarea
                  id="desc"
                  data-ocid="upload.textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description, hashtags... #tlptiktok #viral"
                  rows={3}
                  maxLength={500}
                  className="bg-muted border-border/40 rounded-xl resize-none text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {description.length}/500
                </p>
              </div>

              {/* Upload progress */}
              {createVideo.isPending && (
                <div className="space-y-2" data-ocid="upload.loading_state">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {!identity && (
                <p
                  className="text-sm text-center"
                  style={{ color: "oklch(0.72 0.18 195)" }}
                >
                  Please login from Profile tab to upload videos
                </p>
              )}

              <Button
                data-ocid="upload.submit_button"
                type="submit"
                disabled={createVideo.isPending || !videoFile || !title.trim()}
                className="w-full h-12 rounded-xl font-bold text-base text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.28 350), oklch(0.72 0.18 195))",
                }}
              >
                {createVideo.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Post Video
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
