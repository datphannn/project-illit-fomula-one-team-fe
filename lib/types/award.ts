// lib/types/award.ts

export interface Award {
  id: string;
  year: number;
  category: string;
  winner: string;
  team?: string;
  description: string;
  image?: string;
  stats?: {
    wins?: number;
    podiums?: number;
    points?: number;
  };
}

export interface AwardCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export type AwardFilter =
  | 'all'
  | 'driver'
  | 'team'
  | 'rookie'
  | 'overtake'
  | 'action';
