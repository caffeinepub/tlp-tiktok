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
    title: "TLP Zindabad",
    description: "Labbaik Ya Rasool Allah 💚 #TLP #LabbaikPakistan #tlptiktok",
    username: "@tlp.official",
    avatar: "TL",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "",
    likes: 524500,
    comments: 13421,
    shares: 28900,
    views: 12100000,
    music: "🎵 Naat Shareef - TLP",
  },
  {
    id: "sample-2",
    title: "Allama Saad Rizvi",
    description: "Ishq e Rasool ﷺ زندہ باد 💚🌹 #SaadRizvi #TLP #Labbaik",
    username: "@labbaik.pakistan",
    avatar: "LP",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "",
    likes: 389200,
    comments: 12100,
    shares: 35600,
    views: 8500000,
    music: "🎵 Labbaik Labbaik - Naat",
  },
  {
    id: "sample-3",
    title: "Pakistan Zindabad",
    description: "ہم سب مسلمان ہیں 🇵🇰 #Pakistan #Islam #TLP #viral",
    username: "@tlp.moments",
    avatar: "TM",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "",
    likes: 634100,
    comments: 15678,
    shares: 42300,
    views: 14500000,
    music: "🎵 Islamic Nasheed - Pure",
  },
  {
    id: "sample-4",
    title: "Ishq e Mustafa ﷺ",
    description: "یا رسول اللہ ﷺ ہم آپ سے محبت کرتے ہیں 💚🌹 #Islam #Naat #TLP",
    username: "@deen.lover",
    avatar: "DL",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "",
    likes: 967800,
    comments: 29832,
    shares: 85600,
    views: 28900000,
    music: "🎵 Durood Shareef - Beautiful",
  },
  {
    id: "sample-5",
    title: "Islamic Video",
    description: "اللہ اکبر 🤲 پاکستان کا نام روشن کریں #Islam #Pakistan #fyp",
    username: "@islamic.clips",
    avatar: "IC",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "",
    likes: 478400,
    comments: 14231,
    shares: 52100,
    views: 13200000,
    music: "🎵 Quran Tilawat - Beautiful",
  },
  {
    id: "sample-6",
    title: "TLP March",
    description: "ہر دل میں محبت رسول ﷺ 💚 #TLP #March #Labbaik #Pakistan",
    username: "@tlp.highlights",
    avatar: "TH",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "",
    likes: 312000,
    comments: 8900,
    shares: 19800,
    views: 6700000,
    music: "🎵 TLP Tarana - Official",
  },
  {
    id: "sample-7",
    title: "Namaz Ki Pabandi",
    description: "نماز پڑھو اللہ کی رضا پاؤ 🤲☪️ #Namaz #Islam #Pakistan",
    username: "@deen.pakistan",
    avatar: "DP",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: "",
    likes: 223400,
    comments: 6700,
    shares: 18500,
    views: 5100000,
    music: "🎵 Azan - Masjid",
  },
  {
    id: "sample-8",
    title: "Quran Kareem",
    description: "قرآن کریم کی تلاوت سنیں ❤️ #Quran #Islam #Beautiful #Pakistan",
    username: "@quran.daily",
    avatar: "QD",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl: "",
    likes: 445600,
    comments: 12300,
    shares: 34100,
    views: 9800000,
    music: "🎵 Surah Rahman - Recitation",
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
