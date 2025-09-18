export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
  position: number;
  points: number;
  drivers: string[];
  base?: string;
  chief?: string;
  chassis?: string;
  powerUnit?: string;
}