export const stories = [
  { id: '1', title: 'F1 Unlocked', description: 'Get closer to F1 experience.', image: '/images/F1_Unlocked_promo_image.png', date: '2025-08-24', author: 'Admin', views: 100, category: 'Unlocked' },
  { id: '2', title: 'VIP Experiences', description: 'Unforgettable VIP access.', image: '/images/placeholder.jpg', date: '2025-08-23', author: 'Editor', views: 80, category: 'VIP' },
];

// News (for News Page)
export const news = [
  { id: '1', title: '2025 Season Preview', description: 'What to expect.', image: '/images/placeholder.jpg', date: '2025-08-24', author: 'Admin', category: 'Preview', views: 150 },
  { id: '2', title: 'Driver Changes', description: 'New lineups for teams.', image: '/images/placeholder.jpg', date: '2025-08-23', author: 'Editor', category: 'Update', views: 120 },
];

// Races (for Schedule and Results Page)
export const races = [
  { id: '1', name: 'Bahrain Grand Prix', date: '2025-03-09', location: 'Sakhir', winner: 'Max Verstappen', status: 'completed', results: [{ position: 1, driver: 'Max Verstappen', time: '1:30:00' }], category: 'Grand Prix' },
  { id: '2', name: 'Saudi Arabian Grand Prix', date: '2025-03-16', location: 'Jeddah', winner: '', status: 'upcoming', results: [], category: 'Grand Prix' },
];

// Drivers (for Drivers Page)
export const drivers = [
  { id: '1', name: 'Lewis Hamilton', team_id: '1', nationality: 'British', image: '/images/placeholder.jpg', points: 0, age: 40 },
  { id: '2', name: 'Max Verstappen', team_id: '2', nationality: 'Dutch', image: '/images/placeholder.jpg', points: 0, age: 27 },
];

// Teams (for Teams Page)
export const teams = [
  { id: '1', name: 'Ferrari', base: 'Maranello, Italy', image: '/images/placeholder.jpg', points: 0, year_founded: 1950 },
  { id: '2', name: 'Red Bull', base: 'Milton Keynes, UK', image: '/images/placeholder.jpg', points: 0, year_founded: 2005 },
];

// FantasyGaming (for Fantasy & Gaming Page)
export const fantasyGaming = [
  { id: '1', user_id: '1', race_id: '1', prediction: { winner: 'Lewis Hamilton' }, score: 50, rank: 1 },
  { id: '2', user_id: '2', race_id: '1', prediction: { winner: 'Max Verstappen' }, score: 40, rank: 2 },
  // Thêm 3-8 entries
];

// Store (for Store Page)
export const store = [
  { id: '1', name: 'F1 Cap', price: 50.0, image: '/images/placeholder.jpg', category: 'Merchandise', stock: 100 },
  { id: '2', name: 'F1 T-Shirt', price: 30.0, image: '/images/placeholder.jpg', category: 'Apparel', stock: 200 },
];

// Ticket (for Ticket Page)
export const tickets = [
  { id: '1', race_id: '1', type: 'VIP', price: 1000.0, available: 100, category: 'Premium' },
  { id: '2', race_id: '1', type: 'General', price: 200.0, available: 500, category: 'Standard' },
];

// Feedback (for Feedback Page)
export const feedback = [
  { id: '1', user_id: '1', feedback: 'Great website!', date: '2025-08-24', rating: 5, page: 'Main Page' },
  { id: '2', user_id: '2', feedback: 'Improve navigation.', date: '2025-08-23', rating: 4, page: 'News Page' },
];

// Predict (for Predict Page)
export const predicts = [
  { id: '1', user_id: '1', race_id: '1', predicted_winner: 'Lewis Hamilton', predicted_positions: { 1: 'Lewis Hamilton', 2: 'Max Verstappen' }, date: '2025-08-24', accuracy: 80.5 },
  { id: '2', user_id: '2', race_id: '1', predicted_winner: 'Max Verstappen', predicted_positions: { 1: 'Max Verstappen', 2: 'Lewis Hamilton' }, date: '2025-08-23', accuracy: 90.0 },
];