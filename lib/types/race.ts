export interface Race {
  id: string;
  name: string;
  date: string;
  location: string;
  flag: string;
  round: number;
  winner?: string;
  status: 'upcoming' | 'finished';
  circuit?: string;
  laps?: number;
  team?: string;
  distance?: string;
  time?: string;
}
