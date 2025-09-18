export interface Driver {
  id: string;
  name: string;
  country: string;
  teamId: string;
  image: string;
  number?: number;
  podiums?: number;
  worldChampionships?: number;
  description?: string;
}