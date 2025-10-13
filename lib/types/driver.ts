export interface Driver {
  id: string; // ID duy nhất của tay đua
  name: string; // Tên đầy đủ của tay đua
  country: string; // Quốc gia của tay đua
  teamId: string; // ID của đội đua (liên kết với bảng đội)
  image: string; // URL hoặc đường dẫn đến ảnh của tay đua
  number?: number; // Số xe của tay đua (tùy chọn)
  podiums?: number; // Số lần lên podium (tùy chọn)
  worldChampionships?: number; // Số lần vô địch thế giới (tùy chọn)
  description?: string; // Mô tả ngắn về tay đua (tùy chọn)
  dateOfBirth?: string; // Ngày sinh (định dạng YYYY-MM-DD, tùy chọn)
  debutYear?: number; // Năm ra mắt F1 (tùy chọn)
  points?: number; // Điểm số hiện tại trong mùa giải (tùy chọn)
  wins?: number; // Số lần chiến thắng (tùy chọn)
  fastestLaps?: number; // Số lần đạt fastest lap (tùy chọn)
  polePositions?: number; // Số lần giành pole position (tùy chọn)
  careerStarts?: number; // Số chặng đua đã tham gia trong sự nghiệp (tùy chọn)
  currentStatus?: 'active' | 'retired'; // Trạng thái hiện tại của tay đua (tùy chọn)
  height?: string; // Chiều cao
  weight?: string; // Cân nặng
  nationalityFlag?: string; // Cờ quốc gia dưới dạng emoji hoặc mã (tùy chọn)
}
