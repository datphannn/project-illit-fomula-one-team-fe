export interface Race {
  id: string;
  name: string;
  grandPrix?: string;
  date: string;
  location: string;
  flag: string;
  round: number;
  winner?: string;
  status: 'upcoming' | 'finished' | 'live';
  circuit?: string;
  laps?: number;
  image?: string;
  team?: string;
  distance?: string;
  time?: string;
  pole_sitter?: string;
  pole_team?: string;
  fastest_lap_time?: string;
  qualifying_time?: string;
  weather?: string;
  results?: Array<{
    position: number;
    driverName: string;
    teamName: string;
    lapsCompleted: number;
    timeOrGap: string;
    points: number;
    status?: string;
  }>;
}
