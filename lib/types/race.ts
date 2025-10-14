export interface Race {
  id: string;
  name: string;
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

  // THÊM: Bảng xếp hạng chi tiết của chặng đua
  results?: Array<{
    // Vị trí/Hạng của tay đua trong chặng
    position: number;
    // Tên tay đua
    driverName: string;
    // Tên đội đua
    teamName: string;
    // Số vòng đã hoàn thành
    lapsCompleted: number;
    // Thời gian hoàn thành chặng hoặc khoảng cách
    timeOrGap: string;
    // Điểm đạt được trong chặng
    points: number;
    // Trạng thái/Ghi chú
    status?: string;
  }>;
}
