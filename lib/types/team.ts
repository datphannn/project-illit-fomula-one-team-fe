export interface Team {
  id: string; // ID duy nhất của đội đua
  name: string; // Tên đội đua
  logo: string; // URL hoặc đường dẫn đến logo đội
  color: string; // Màu sắc chủ đạo (HEX hoặc tên màu)
  position: number; // Vị trí hiện tại trong bảng xếp hạng đội
  points: number; // Điểm số hiện tại của đội
  drivers: string[]; // Mảng ID của các tay đua thuộc đội

  // ===== THÔNG TIN CHUNG =====
  base?: string; // Trụ sở chính
  chief?: string; // Trưởng đội (Team Principal)
  chassis?: string; // Khung xe
  powerUnit?: string; // Động cơ
  technicalChief?: string; // Kỹ sư trưởng kỹ thuật
  debutYear?: number; // Năm ra mắt F1
  totalRaces?: number; // Tổng số chặng tham gia
  website?: string; // Website chính thức
  sponsor?: string[]; // Nhà tài trợ chính
  engineSupplier?: string; // Nhà cung cấp động cơ
  tireSupplier?: string; // Nhà cung cấp lốp (thường là Pirelli)

  // ===== THỐNG KÊ MÙA GIẢI HIỆN TẠI =====
  seasonStats?: {
    seasonYear: number; // Năm mùa giải
    seasonPosition: number; // Vị trí đội trong BXH
    seasonPoints: number; // Tổng điểm
    grandPrixRaces: number; // Số chặng GP đã đua
    grandPrixPoints: number; // Điểm GP
    grandPrixWins: number; // Số chiến thắng GP
    grandPrixPodiums: number; // Podium GP
    grandPrixPoles: number; // Pole GP
    grandPrixTop10s: number; // Top 10 GP
    dhlFastestLaps: number; // Fastest lap GP
    dnfs: number; // DNF GP

    sprintRaces: number; // Số chặng Sprint
    sprintPoints: number; // Điểm Sprint
    sprintWins: number; // Chiến thắng Sprint
    sprintPodiums: number; // Podium Sprint
    sprintPoles: number; // Pole Sprint
    sprintTop10s: number; // Top 10 Sprint
  };

  // ===== THỐNG KÊ SỰ NGHIỆP =====
  teamStats?: {
    grandPrixEntered: number; // Số GP từng tham gia
    teamPoints: number; // Tổng điểm lịch sử
    highestRaceFinish: string; // Thành tích cao nhất (vd: "1 (x201)")
    podiums: number; // Tổng podium
    highestGridPosition: string; // Vị trí xuất phát cao nhất (vd: "1 (x173)")
    polePositions: number; // Tổng pole
    worldChampionships: number; // Số lần vô địch đội đua
    raceWins?: number; // Tổng số chiến thắng
  };
}
