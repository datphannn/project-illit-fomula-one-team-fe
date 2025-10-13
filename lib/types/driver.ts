export interface Driver {
  id: string; // ID duy nhất
  name: string; // Tên đầy đủ
  country: string; // Quốc gia
  teamId: string; // ID đội đua
  image: string; // Ảnh
  number?: number; // Số xe
  description?: string; // Mô tả
  dateOfBirth?: string; // YYYY-MM-DD
  debutYear?: number; // Năm ra mắt
  currentStatus?: 'active' | 'retired'; // Trạng thái
  height?: string; // Chiều cao
  weight?: string; // Cân nặng
  nationalityFlag?: string; // Cờ quốc gia (emoji hoặc mã)

  // ===== THỐNG KÊ MÙA GIẢI HIỆN TẠI =====
  seasonStats?: {
    seasonYear: number; // Năm mùa giải
    seasonPosition: number; // Thứ hạng tổng
    seasonPoints: number; // Tổng điểm
    grandPrixRaces: number; // Số GP đã tham dự trong mùa
    grandPrixPoints: number; // Tổng điểm từ GP
    grandPrixWins: number; // Số chiến thắng GP
    grandPrixPodiums: number; // Số podium GP
    grandPrixPoles: number; // Pole GP
    grandPrixTop10s: number; // Số lần top 10 GP
    dhlFastestLaps: number; // Số fastest lap GP
    dnfs: number; // Số lần DNF GP

    sprintRaces: number; // Số Sprint race đã tham gia
    sprintPoints: number; // Tổng điểm Sprint
    sprintWins: number; // Số lần thắng Sprint
    sprintPodiums: number; // Số lần podium Sprint
    sprintPoles: number; // Số pole Sprint
    sprintTop10s: number; // Số lần top 10 Sprint
  };

  // ===== THỐNG KÊ SỰ NGHIỆP =====
  careerStats?: {
    grandPrixEntered: number; // Số GP đã tham gia
    careerPoints: number; // Tổng điểm sự nghiệp
    careerWins: number; // Số chặng thắng sự nghiệp
    careerPodiums: number; // Podium sự nghiệp
    careerPolePositions: number; // Pole sự nghiệp
    careerFastestLaps: number; // Fastest lap sự nghiệp
    worldChampionships: number; // Số lần vô địch thế giới
    dnfs: number; // Số lần DNF trong sự nghiệp
    highestRaceFinish: string; // Thành tích cao nhất (vd: "1 (x67)")
    highestGridPosition: string; // Vị trí xuất phát cao nhất (vd: "1 (x46)")
    starts: number; // Tổng số lần xuất phát
  };
}
