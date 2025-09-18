import { NewsItem } from '@/lib/types/news';
import { Race } from '@/lib/types/race';
import { Driver } from '@/lib/types/driver';
import { Team } from '@/lib/types/team';
import { Video } from '@/lib/types/video';
import { Story } from '@/lib/types/story';

// =========================
// Mock Races
// =========================
export const mockRacesSimple: Race[] = [
  { 
    id: "1", 
    name: "Australian Grand Prix", 
    date: "2025-03-16", 
    location: "Melbourne, Australia",
    flag: "🇦🇺",
    round: 1,
    status: "upcoming"
  },
  { 
    id: "2", 
    name: "Bahrain Grand Prix", 
    date: "2025-03-30", 
    location: "Sakhir, Bahrain",
    flag: "🇧🇭",
    round: 2,
    status: "upcoming"
  },
  { 
    id: "3", 
    name: "Monaco Grand Prix", 
    date: "2025-05-25", 
    location: "Monte Carlo, Monaco",
    flag: "🇲🇨",
    round: 3,
    status: "upcoming"
  },
];

export const mockRacesDetailed: Race[] = [
  {
    id: "1",
    name: "Australian Grand Prix",
    date: "2025-03-16",
    location: "Melbourne, Australia",
    flag: "🇦🇺",
    round: 1,
    status: "upcoming",
    circuit: "Albert Park Circuit",
    laps: 58,
    distance: "307.574 km"
  },
  {
    id: "2",
    name: "Bahrain Grand Prix",
    date: "2025-03-30",
    location: "Sakhir, Bahrain",
    flag: "🇧🇭",
    round: 2,
    status: "upcoming",
    circuit: "Bahrain International Circuit",
    laps: 57,
    distance: "308.238 km"
  },
];

// =========================
// Mock Drivers
// =========================
export const mockDriversSimple: Driver[] = [
  { id: 'verstappen', name: 'Max Verstappen', country: 'Netherlands', teamId: 'redbull', image: '/images/drivers/verstappen.png' },
  { id: 'perez', name: 'Sergio Pérez', country: 'Mexico', teamId: 'redbull', image: '/images/drivers/perez.png' },
  { id: 'leclerc', name: 'Charles Leclerc', country: 'Monaco', teamId: 'ferrari', image: '/images/drivers/leclerc.png' },
  { id: 'sainz', name: 'Carlos Sainz', country: 'Spain', teamId: 'ferrari', image: '/images/drivers/sainz.png' },
  { id: 'hamilton', name: 'Lewis Hamilton', country: 'UK', teamId: 'mercedes', image: '/images/drivers/hamilton.png' },
  { id: 'russell', name: 'George Russell', country: 'UK', teamId: 'mercedes', image: '/images/drivers/russell.png' }, 
];

export const mockDriversDetailed: Driver[] = [
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    country: 'Netherlands',
    teamId: 'redbull',
    image: '/images/drivers/verstappen.png',
    number: 1,
    podiums: 98,
    worldChampionships: 3,
    description: 'Three-time World Champion with dominant Red Bull career.',
  },
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    country: 'Monaco',
    teamId: 'ferrari',
    image: '/images/drivers/leclerc.png',
    number: 16,
    podiums: 25,
    worldChampionships: 0,
    description: 'Ferrari’s lead driver known for qualifying pace.',
  },
];

// =========================
// Mock Teams
// =========================
export const mockTeamsSimple: Team[] = [
  { 
    id: "redbull", 
    name: "Red Bull Racing", 
    logo: "/images/teams/redbull.png", 
    color: "#3671C6", 
    position: 1, 
    points: 451, 
    drivers: ["verstappen", "perez"] 
  },
  { 
    id: "ferrari", 
    name: "Scuderia Ferrari", 
    logo: "/images/teams/ferrari.png", 
    color: "#E8002D", 
    position: 2, 
    points: 389, 
    drivers: ["leclerc", "sainz"] 
  },
  { 
    id: "mercedes", 
    name: "Mercedes-AMG", 
    logo: "/images/teams/mercedes.png", 
    color: "#27F4D2", 
    position: 3, 
    points: 312, 
    drivers: ["hamilton", "russell"] 
  },
  { 
    id: "mclaren", 
    name: "McLaren", 
    logo: "/images/teams/mclaren.png", 
    color: "#FF8000", 
    position: 4, 
    points: 289, 
    drivers: ["norris", "piastri"] 
  },
  { 
    id: "astonmartin", 
    name: "Aston Martin", 
    logo: "/images/teams/astonmartin.png", 
    color: "#006F62", 
    position: 5, 
    points: 198, 
    drivers: ["alonso", "stroll"] 
  },
  { 
    id: "alpine", 
    name: "Alpine", 
    logo: "/images/teams/alpine.png", 
    color: "#0090FF", 
    position: 6, 
    points: 129, 
    drivers: ["ocon", "gasly"] 
  },
  { 
    id: "williams", 
    name: "Williams", 
    logo: "/images/teams/williams.png", 
    color: "#00A0DE", 
    position: 7, 
    points: 75, 
    drivers: ["albon", "sargeant"] 
  },
  { 
    id: "rb", 
    name: "RB (Visa Cash App RB)", 
    logo: "/images/teams/rb.png", 
    color: "#2B4562", 
    position: 8, 
    points: 61, 
    drivers: ["tsunoda", "ricciardo"] 
  },
  { 
    id: "sauber", 
    name: "Stake F1 Team Kick Sauber", 
    logo: "/images/teams/sauber.png", 
    color: "#52E252", 
    position: 9, 
    points: 34, 
    drivers: ["bottas", "zhou"] 
  },
  { 
    id: "haas", 
    name: "Haas F1 Team", 
    logo: "/images/teams/haas.png", 
    color: "#B6BABD", 
    position: 10, 
    points: 22, 
    drivers: ["hulkenberg", "magnussen"] 
  },
];


export const mockTeamsDetailed: Team[] = [
  {
    id: 'redbull',
    name: 'Red Bull Racing',
    logo: '/images/teams/redbull.png',
    color: '#3671C6',
    position: 1,
    points: 451,
    drivers: ['verstappen', 'perez'],
    base: 'Milton Keynes, UK',
    chief: 'Christian Horner',
    chassis: 'RB21',
    powerUnit: 'Honda RBPT',
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    logo: '/images/teams/ferrari.png',
    color: '#E8002D',
    position: 2,
    points: 389,
    drivers: ['leclerc', 'sainz'],
    base: 'Maranello, Italy',
    chief: 'Frédéric Vasseur',
    chassis: 'SF-25',
    powerUnit: 'Ferrari',
  },
];

// =========================
// Mock News
// =========================
export const mockNewsSimple: NewsItem[] = [
  { 
    id: '1', 
    title: 'Verstappen secures dramatic victory in Australia', 
    image: '/images/news/australia.png', 
    date: '2025-03-16', 
    category: 'Race',
    href: '/news/verstappen-australia-victory',
    summary: 'Max Verstappen wins dramatic Australian Grand Prix',
    readTime: '3 min'
  },
  { 
    id: '2', 
    title: 'Ferrari announces major upgrade package for Imola', 
    image: '/images/news/ferrari-upgrade.png', 
    date: '2025-04-20', 
    category: 'Tech',
    href: '/news/ferrari-upgrade-imola',
    summary: 'Ferrari reveals major technical upgrades',
    readTime: '4 min'
  },
  { 
    id: '3', 
    title: 'Mercedes confident ahead of Monaco GP', 
    image: '/images/news/monaco-mercedes.png', 
    date: '2025-05-22', 
    category: 'Team',
    href: '/news/mercedes-monaco-confidence',
    summary: 'Mercedes optimistic for Monaco challenge',
    readTime: '2 min'
  },
];

export const mockNewsDetailed: NewsItem[] = [
  {
    id: '1',
    title: 'Verstappen secures dramatic victory in Australia',
    image: '/images/news/australia.png',
    date: '2025-03-16',
    category: 'Race',
    href: "/news/australia-victory",
    author: 'John Doe',
    content: 'Max Verstappen dominated the Australian GP with a lights-to-flag victory...',
    summary: 'Max Verstappen wins dramatic Australian Grand Prix',
    readTime: '3 min'
  },
  {
    id: '2',
    title: 'Ferrari announces major upgrade package for Imola',
    image: '/images/news/ferrari-upgrade.png',
    date: '2025-04-20',
    category: 'Tech',
    href: "/news/ferrari-upgrade",
    author: 'Jane Smith',
    content: 'Ferrari introduces a new aerodynamic package ahead of the Imola GP...',
    summary: 'Ferrari reveals major technical upgrades for Imola',
    readTime: '4 min'
  },
];

// =========================
// Videos
// =========================
export const mockVideosDetailed: Video[] = [
  {
    id: '1',
    title: 'Race Highlights: Australian GP 2025',
    thumbnail: '/images/videos/australia-highlights.png',
    duration: '7:45',
    date: '2025-03-16',
    url: 'https://example.com/videos/australia',
    description: 'Full highlights from the opening race in Melbourne.',
  },
  {
    id: '2',
    title: 'Onboard: Leclerc in Monaco',
    thumbnail: '/images/videos/leclerc-monaco.png',
    duration: '5:20',
    date: '2025-05-25',
    url: 'https://example.com/videos/leclerc-monaco',
    description: 'Ride along with Charles Leclerc through the streets of Monte Carlo.',
  },
];

// =========================
// Stories
// =========================
export const mockStoriesDetailed: Story[] = [
  {
    id: '1',
    title: 'Behind the scenes in Bahrain',
    image: '/images/stories/bahrain-story.png',
    link: "/stories/f1-racing-news",
    summary: 'Exclusive access to the paddock action in Bahrain.',
    content: 'Detailed story content with interviews, photos, and insights...',
  },
  {
    id: '2',
    title: 'Ferrari’s big gamble',
    image: '/images/stories/ferrari-gamble.png',
    link: "/stories/driver-interviews",
    summary: 'How Ferrari is pushing the limits with new upgrades.',
    content: 'In-depth analysis of Ferrari’s approach to the 2025 season...',
  },
];