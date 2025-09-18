export interface Race {
  id: string;        
  name: string;      
  date: string;      
  location: string;  
  flag: string;      
  round: number;     
  status: "upcoming" | "finished"; 
  circuit?: string;  
  laps?: number;     
  distance?: string; 
}
