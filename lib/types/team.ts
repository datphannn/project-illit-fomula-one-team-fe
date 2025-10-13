export interface Team {
  id: string; // ID duy nhất của đội đua
  name: string; // Tên đội đua
  logo: string; // URL hoặc đường dẫn đến logo đội
  color: string; // Màu sắc chủ đạo của đội (ví dụ: HEX hoặc tên màu)
  position: number; // Vị trí hiện tại trong bảng xếp hạng đội
  points: number; // Điểm số hiện tại của đội
  drivers: string[]; // Mảng ID của các tay đua thuộc đội
  base?: string; // Địa điểm trụ sở chính (tùy chọn)
  chief?: string; // Tên trưởng đội hoặc đội trưởng (tùy chọn)
  chassis?: string; // Tên khung xe (tùy chọn)
  powerUnit?: string; // Nhà cung cấp động cơ (tùy chọn)
  technicalChief?: string; // Tên kỹ sư trưởng kỹ thuật (tùy chọn)
  raceWins?: number; // Số lần chiến thắng trong lịch sử (tùy chọn)
  championships?: number; // Số lần vô địch đội đua (tùy chọn)
  debutYear?: number; // Năm ra mắt F1 (tùy chọn)
  totalRaces?: number; // Tổng số chặng đua đã tham gia (tùy chọn)
  website?: string; // Đường link website chính thức (tùy chọn)
  sponsor?: string[]; // Danh sách nhà tài trợ chính (tùy chọn)
  engineSupplier?: string; // Nhà cung cấp động cơ (tùy chọn, có thể trùng powerUnit nhưng rõ ràng hơn)
  tireSupplier?: string; // Nhà cung cấp lốp (thường là Pirelli, tùy chọn)
}
