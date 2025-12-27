// File: app/drivers/[id]/page.tsx
'use client';

import { mockDriversDetailed, mockTeamsDetailed } from '@/lib/api/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Trophy,
  Flag,
  Calendar,
  MapPin,
  Award,
  Star,
  ArrowLeft,
  Target,
  Zap,
  TrendingUp,
  User,
} from 'lucide-react';
import CommentSystem, { Comment } from '@/components/CommentSystem';
import { useState } from 'react';

export default function DriverDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const driver = mockDriversDetailed.find(d => d.id === params.id);

  if (!driver) {
    notFound();
  }

  const team = mockTeamsDetailed.find(t => t.id === driver.teamId);
  const teamColor = team?.color || '#e10600';
  const seasonStats = driver.seasonStats;
  const careerStats = driver.careerStats;

  // State để quản lý comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment-1',
      user: {
        id: 'user-101',
        name: 'F1 Analyst',
        role: 'editor',
        avatar: '/avatars/analyst.jpg',
      },
      content: `${driver.name} has been exceptional this season! Their consistency in qualifying has been a key factor in their success. What do you think about their performance so far?`,
      timestamp: new Date('2024-01-20T10:30:00'),
      likes: 67,
      isLiked: false,
      replies: [
        {
          id: 'reply-1',
          user: {
            id: 'user-102',
            name: 'Team Supporter',
            role: 'user',
          },
          content:
            'I agree! The way they manage tires during races is phenomenal. Best strategist on the grid!',
          timestamp: new Date('2024-01-20T12:45:00'),
          likes: 24,
          isLiked: true,
        },
        {
          id: 'reply-2',
          user: {
            id: 'user-103',
            name: 'Technical Expert',
            role: 'moderator',
            avatar: '/avatars/tech-expert.jpg',
          },
          content:
            'The data shows their cornering speed has improved by 2.3% compared to last season. Impressive development.',
          timestamp: new Date('2024-01-20T14:20:00'),
          likes: 31,
          isLiked: false,
        },
      ],
    },
    {
      id: 'comment-2',
      user: {
        id: 'user-104',
        name: 'New Fan',
        role: 'user',
      },
      content: `Just started following F1 this season, and ${driver.name.split(' ').pop()} quickly became my favorite driver! The overtake in Monaco was incredible.`,
      timestamp: new Date('2024-01-19T08:15:00'),
      likes: 42,
      isLiked: false,
      replies: [
        {
          id: 'reply-3',
          user: {
            id: 'user-101',
            name: 'F1 Analyst',
            role: 'editor',
            avatar: '/avatars/analyst.jpg',
          },
          content:
            'Welcome to the sport! That Monaco overtake will be remembered for years to come.',
          timestamp: new Date('2024-01-19T09:30:00'),
          likes: 15,
          isLiked: false,
        },
      ],
    },
    {
      id: 'comment-3',
      user: {
        id: 'user-105',
        name: 'Race Historian',
        role: 'admin',
        avatar: '/avatars/historian.jpg',
      },
      content: `With ${careerStats?.careerWins || 0} career wins, ${driver.name} is now among the top 20 winners in F1 history. Historic achievement!`,
      timestamp: new Date('2024-01-18T16:45:00'),
      likes: 89,
      isLiked: true,
    },
    {
      id: 'comment-4',
      user: {
        id: 'user-106',
        name: 'Season Predictor',
        role: 'user',
      },
      content: `I predict ${driver.name} will finish the season in P${seasonStats?.seasonPosition || 3}. Their current form is outstanding!`,
      timestamp: new Date('2024-01-17T11:20:00'),
      likes: 38,
      isLiked: false,
      replies: [
        {
          id: 'reply-4',
          user: {
            id: 'user-107',
            name: 'Stats Master',
            role: 'editor',
          },
          content: `Based on current performance metrics, I project P${(seasonStats?.seasonPosition || 3) - 1} if they maintain this pace.`,
          timestamp: new Date('2024-01-17T13:45:00'),
          likes: 22,
          isLiked: false,
        },
      ],
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getExperience = (debutYear: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - debutYear;
  };

  // Handler cho thêm comment mới
  const handleAddComment = async (content: string): Promise<Comment | void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          user: {
            id: 'current-user-id',
            name: 'You',
            role: 'user',
          },
          content,
          timestamp: new Date(),
          likes: 0,
          replies: [],
        };
        setComments(prev => [newComment, ...prev]);
        resolve(newComment);
      }, 500);
    });
  };

  // Handler cho like comment
  const handleLikeComment = async (
    commentId: string
  ): Promise<{ likes: number } | void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setComments(prev =>
          prev.map(comment => {
            if (comment.id === commentId) {
              const updatedLikes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1;
              return {
                ...comment,
                likes: updatedLikes,
                isLiked: !comment.isLiked,
              };
            }
            return comment;
          })
        );
        resolve({ likes: 45 });
      }, 300);
    });
  };

  // Handler cho thêm reply
  const handleAddReply = async (
    commentId: string,
    content: string
  ): Promise<Comment | void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newReply: Comment = {
          id: `reply-${Date.now()}`,
          user: {
            id: 'current-user-id',
            name: 'You',
            role: 'user',
          },
          content,
          timestamp: new Date(),
          likes: 0,
        };

        setComments(prev =>
          prev.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              };
            }
            return comment;
          })
        );
        resolve(newReply);
      }, 500);
    });
  };

  // Handler cho edit comment
  const handleEditComment = async (
    commentId: string,
    content: string
  ): Promise<Comment | void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const updateCommentInTree = (commentsList: Comment[]): Comment[] => {
          return commentsList.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, content };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: updateCommentInTree(comment.replies),
              };
            }
            return comment;
          });
        };
        setComments(prev => updateCommentInTree(prev));
        resolve(undefined);
      }, 500);
    });
  };

  // Handler cho delete comment
  const handleDeleteComment = async (commentId: string): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const removeCommentFromTree = (commentsList: Comment[]): Comment[] => {
          return commentsList
            .filter(comment => comment.id !== commentId)
            .map(comment => ({
              ...comment,
              replies: comment.replies
                ? removeCommentFromTree(comment.replies)
                : [],
            }));
        };
        setComments(prev => removeCommentFromTree(prev));
        resolve();
      }, 500);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f15] to-[#1a1a2e]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/60 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 py-8 relative">
          {/* Back Button */}
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Drivers
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8">
            {/* Driver Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-4 border-gray-700/50">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Driver Number */}
                {driver.number && (
                  <div className="absolute -bottom-2 -right-2">
                    <div
                      className="text-8xl font-black opacity-20"
                      style={{ color: teamColor }}
                    >
                      {driver.number}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Driver Info */}
            <div className="flex-1">
              {/* Name */}
              <div className="mb-4">
                <div className="text-gray-300 text-xl mb-2">
                  {driver.name.split(' ').slice(0, -1).join(' ')}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {driver.name.split(' ').pop()?.toUpperCase()}
                </h1>
              </div>

              {/* Team */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-2 h-12 rounded-full"
                  style={{ backgroundColor: teamColor }}
                />
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">
                    Team
                  </div>
                  <div className="text-white text-2xl font-bold">
                    {team?.name || driver.teamId}
                  </div>
                </div>
              </div>

              {/* Season Position */}
              {seasonStats?.seasonPosition && (
                <div className="mb-6">
                  <div className="text-gray-400 text-sm uppercase tracking-wide mb-1">
                    2025 Championship Position
                  </div>
                  <div className="text-3xl font-bold text-white">
                    P{seasonStats.seasonPosition}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                {driver.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-white">{driver.country}</span>
                  </div>
                )}
                {driver.nationalityFlag && (
                  <div className="text-2xl">{driver.nationalityFlag}</div>
                )}
                {driver.number && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-white">#{driver.number}</span>
                  </div>
                )}
                {driver.dateOfBirth && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-white">
                      {getAge(driver.dateOfBirth)} years
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {seasonStats && (
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Points */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Flag className="w-5 h-5 text-red-500" />
                <span className="text-gray-400 text-sm uppercase">Points</span>
              </div>
              <div className="text-3xl font-black text-white">
                {seasonStats.seasonPoints}
              </div>
            </div>

            {/* Wins */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400 text-sm uppercase">Wins</span>
              </div>
              <div className="text-3xl font-black text-white">
                {seasonStats.grandPrixWins}
              </div>
            </div>

            {/* Podiums */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400 text-sm uppercase">Podiums</span>
              </div>
              <div className="text-3xl font-black text-white">
                {seasonStats.grandPrixPodiums}
              </div>
            </div>

            {/* Fastest Laps */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400 text-sm uppercase">
                  Fastest Laps
                </span>
              </div>
              <div className="text-3xl font-black text-white">
                {seasonStats.dhlFastestLaps}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: teamColor }}
                />
                Biography
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {driver.description ? (
                  <p>{driver.description}</p>
                ) : (
                  <>
                    <p>
                      {driver.name} is a professional Formula 1 driver from{' '}
                      {driver.country}
                      {driver.dateOfBirth &&
                        `, born on ${formatDate(driver.dateOfBirth)}`}
                      .
                      {driver.debutYear &&
                        ` They made their F1 debut in ${driver.debutYear} and have`}
                      {careerStats?.grandPrixEntered
                        ? ` participated in ${careerStats.grandPrixEntered} Grand Prix races throughout their career.`
                        : ' established themselves as a competitive driver in the sport.'}
                    </p>
                    {driver.teamId && (
                      <p>
                        Currently racing for {team?.name || driver.teamId},{' '}
                        {driver.name.split(' ').slice(0, -1).join(' ')}
                        {seasonStats?.seasonPoints !== undefined &&
                          ` has accumulated ${seasonStats.seasonPoints} points`}
                        {seasonStats?.grandPrixWins !== undefined &&
                          seasonStats.grandPrixWins > 0 &&
                          ` with ${seasonStats.grandPrixWins} race victory${seasonStats.grandPrixWins > 1 ? 'ies' : ''}`}
                        in the 2025 season.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 2025 Season Statistics */}
            {seasonStats && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: teamColor }}
                  />
                  2025 Season Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">
                      {seasonStats.grandPrixRaces}
                    </div>
                    <div className="text-gray-400 text-sm">Races</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">
                      {seasonStats.grandPrixTop10s}
                    </div>
                    <div className="text-gray-400 text-sm">Top 10 Finishes</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">
                      {seasonStats.grandPrixPoles}
                    </div>
                    <div className="text-gray-400 text-sm">Pole Positions</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">
                      {seasonStats.dnfs}
                    </div>
                    <div className="text-gray-400 text-sm">DNFs</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">
                      {seasonStats.sprintPoints}
                    </div>
                    <div className="text-gray-400 text-sm">Sprint Points</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-2xl font-bold text-white">
                      {seasonStats.sprintTop10s}
                    </div>
                    <div className="text-gray-400 text-sm">Sprint Top 10s</div>
                  </div>
                </div>
              </div>
            )}

            {/* Career Statistics */}
            {careerStats && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: teamColor }}
                  />
                  Career Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {careerStats.grandPrixEntered}
                    </div>
                    <div className="text-gray-400 text-sm">Grand Prix</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {careerStats.careerWins}
                    </div>
                    <div className="text-gray-400 text-sm">Wins</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {careerStats.careerPodiums}
                    </div>
                    <div className="text-gray-400 text-sm">Podiums</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {careerStats.careerPolePositions}
                    </div>
                    <div className="text-gray-400 text-sm">Pole Positions</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <Flag className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {careerStats.careerFastestLaps}
                    </div>
                    <div className="text-gray-400 text-sm">Fastest Laps</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {careerStats.worldChampionships}
                    </div>
                    <div className="text-gray-400 text-sm">World Titles</div>
                  </div>
                </div>
              </div>
            )}

            {/* ========== COMMENT SECTION ========== */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: teamColor }}
                />
                Fan Discussion
              </h2>

              <CommentSystem
                comments={comments}
                title={`Discuss ${driver.name.split(' ').pop()}'s Performance`}
                placeholder={`Share your thoughts about ${driver.name}'s performance, stats, or future predictions...`}
                emptyMessage="No discussions yet. Be the first to share your opinion about this driver!"
                onAddComment={handleAddComment}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
                onLikeComment={handleLikeComment}
                onAddReply={handleAddReply}
                maxLength={800}
                allowReplies={true}
                allowLikes={true}
                allowEditing={true}
                allowDeleting={true}
                showTitle={false} // Đã có title riêng
                showCommentForm={true}
                className="mt-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                {driver.number && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Driver Number</span>
                    <span
                      className="font-black text-xl"
                      style={{ color: teamColor }}
                    >
                      #{driver.number}
                    </span>
                  </div>
                )}
                {driver.country && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Nationality</span>
                    <div className="flex items-center gap-2">
                      {driver.nationalityFlag && (
                        <span className="text-lg">
                          {driver.nationalityFlag}
                        </span>
                      )}
                      <span className="text-white font-semibold">
                        {driver.country}
                      </span>
                    </div>
                  </div>
                )}
                {driver.dateOfBirth && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Date of Birth</span>
                    <span className="text-white font-semibold">
                      {formatDate(driver.dateOfBirth)}
                    </span>
                  </div>
                )}
                {driver.dateOfBirth && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Age</span>
                    <span className="text-white font-semibold">
                      {getAge(driver.dateOfBirth)} years
                    </span>
                  </div>
                )}
                {driver.debutYear && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">F1 Debut</span>
                    <span className="text-white font-semibold">
                      {driver.debutYear}
                    </span>
                  </div>
                )}
                {driver.debutYear && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-white font-semibold">
                      {getExperience(driver.debutYear)} years
                    </span>
                  </div>
                )}
                {driver.height && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Height</span>
                    <span className="text-white font-semibold">
                      {driver.height}
                    </span>
                  </div>
                )}
                {driver.weight && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Weight</span>
                    <span className="text-white font-semibold">
                      {driver.weight}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Team Info */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">
                Team Information
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm uppercase mb-1">
                    Team
                  </div>
                  <div className="text-white font-semibold">
                    {team?.name || driver.teamId}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm uppercase mb-1">
                    Team Color
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border-2 border-gray-700"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="text-white font-mono text-sm">
                      {teamColor}
                    </span>
                  </div>
                </div>
                {team?.position && (
                  <div>
                    <div className="text-gray-400 text-sm uppercase mb-1">
                      Constructors Position
                    </div>
                    <div className="text-white font-semibold">
                      P{team.position}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Career Highlights */}
            {careerStats && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">
                  Career Highlights
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Highest Finish</span>
                    <span className="text-white font-semibold">
                      {careerStats.highestRaceFinish}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Highest Grid</span>
                    <span className="text-white font-semibold">
                      {careerStats.highestGridPosition}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Career Points</span>
                    <span className="text-white font-semibold">
                      {careerStats.careerPoints}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Career DNFs</span>
                    <span className="text-white font-semibold">
                      {careerStats.dnfs}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Status */}
            {driver.currentStatus && (
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4">Status</h3>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    driver.currentStatus === 'active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      driver.currentStatus === 'active'
                        ? 'bg-green-500 animate-pulse'
                        : 'bg-gray-500'
                    }`}
                  />
                  <span className="font-semibold text-sm uppercase">
                    {driver.currentStatus}
                  </span>
                </div>
              </div>
            )}

            {/* Comment Stats */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">
                Discussion Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Comments</span>
                  <span className="text-white font-semibold">
                    {comments.reduce(
                      (total, comment) =>
                        total + 1 + (comment.replies?.length || 0),
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Discussions</span>
                  <span className="text-white font-semibold">
                    {
                      comments.filter(c => c.replies && c.replies.length > 0)
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Likes</span>
                  <span className="text-white font-semibold">
                    {comments.reduce(
                      (total, comment) => total + comment.likes,
                      0
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-700/50">
                  <div className="text-gray-400 text-sm mb-2">
                    Most Active Roles
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      Editor
                    </span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      Moderator
                    </span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button Bottom */}
        <div className="mt-12 text-center">
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Drivers
          </Link>
        </div>
      </div>
    </div>
  );
}
