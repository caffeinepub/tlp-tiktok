export interface SampleVideo {
  id: string;
  title: string;
  description: string;
  username: string;
  avatar: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  music: string;
}

export const SAMPLE_VIDEOS: SampleVideo[] = [
  {
    id: "sample-1",
    title: "Big Buck Bunny Adventures",
    description: "Incredible nature vibes 🌿✨ #nature #viral #fyp #tlptiktok",
    username: "@wild.creator",
    avatar: "WC",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "",
    likes: 124500,
    comments: 3421,
    shares: 8900,
    views: 2100000,
    music: "🎵 Original Sound - wild.creator",
  },
  {
    id: "sample-2",
    title: "Forest Journey",
    description:
      "Life is beautiful when you explore 🦋🌸 #explore #adventure #viral",
    username: "@forest.vibes",
    avatar: "FV",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "",
    likes: 89200,
    comments: 2100,
    shares: 5600,
    views: 1500000,
    music: "🎵 Trending Beat - DJ Pro",
  },
  {
    id: "sample-3",
    title: "Sunset Dreams",
    description:
      "Golden hour magic ☀️✨ You won't believe this view! #sunset #beautiful",
    username: "@dreamy.shots",
    avatar: "DS",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "",
    likes: 234100,
    comments: 5678,
    shares: 12300,
    views: 4500000,
    music: "🎵 Summer Feelings - Music Box",
  },
  {
    id: "sample-4",
    title: "Epic Wildlife Moment",
    description: "This made my day!! 🐰❤️ #wildlife #cute #trending #tlptiktok",
    username: "@epic.moments",
    avatar: "EM",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "",
    likes: 567800,
    comments: 9832,
    shares: 45600,
    views: 8900000,
    music: "🎵 Viral Mix 2026 - HipHop Nation",
  },
  {
    id: "sample-5",
    title: "Nature Documentary",
    description:
      "Planet Earth vibes 🌍💫 Drop a ❤️ if you love nature! #nature #fyp",
    username: "@planet.earth.fan",
    avatar: "PE",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "",
    likes: 178400,
    comments: 4231,
    shares: 22100,
    views: 3200000,
    music: "🎵 Cinematic Mood - Film Score",
  },
];

export const SAMPLE_COMMENTS = [
  {
    id: "c1",
    user: "@funnycat23",
    text: "This is absolutely amazing!! 😍🔥",
    likes: 4521,
    time: "2h",
  },
  {
    id: "c2",
    user: "@trendlover",
    text: "Can't stop watching this on repeat 😭💀",
    likes: 2341,
    time: "3h",
  },
  {
    id: "c3",
    user: "@dance.queen",
    text: "POV: You watched this 100 times 👀",
    likes: 1876,
    time: "4h",
  },
  {
    id: "c4",
    user: "@viral.clips",
    text: "The way I needed to see this today 🥺",
    likes: 923,
    time: "5h",
  },
  {
    id: "c5",
    user: "@happy.vibes",
    text: "Best content on this app fr fr 💯🙌",
    likes: 654,
    time: "6h",
  },
  {
    id: "c6",
    user: "@nocap.real",
    text: "Not me crying at 2am 😭❤️",
    likes: 432,
    time: "8h",
  },
  {
    id: "c7",
    user: "@trendsetter99",
    text: "Sending this to everyone I know 🔄",
    likes: 287,
    time: "10h",
  },
  {
    id: "c8",
    user: "@aesthetic.girl",
    text: "Please do a part 2!! 🙏✨",
    likes: 198,
    time: "12h",
  },
];

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
