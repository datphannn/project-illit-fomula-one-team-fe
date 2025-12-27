// File: app/teams/[id]/page.tsx

'use client';

import { mockTeamsDetailed } from '@/lib/api/mockData';
import { mockDriversDetailed } from '@/lib/api/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Trophy,
  Flag,
  Calendar,
  MapPin,
  Zap,
  Users,
  Globe,
  Award,
  Wrench,
  Gauge,
  MessageSquare,
} from 'lucide-react';
import CommentSystem, { Comment } from '@/components/CommentSystem';
import { useState } from 'react';

export default function TeamDetailPage({ params }: { params: { id: string } }) {
  const team = mockTeamsDetailed.find(t => t.id === params.id);

  if (!team) {
    notFound();
  }

  // Lấy thông tin drivers của team
  const teamDrivers =
    mockDriversDetailed?.filter(d => d.teamId === team.id) || [];

  // Tính toán các giá trị từ stats
  const raceWins =
    team.teamStats?.raceWins || team.seasonStats?.grandPrixWins || 0;
  const championships = team.teamStats?.worldChampionships || 0;
  const totalRaces = team.teamStats?.grandPrixEntered || team.totalRaces || 0;
  const debutYear = team.debutYear || 0;
  const careerPoints = team.teamStats?.teamPoints || 0;

  // State để quản lý comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment-1',
      user: {
        id: 'user-201',
        name: 'F1 Strategist',
        role: 'editor',
        avatar: '/avatars/strategist.jpg',
      },
      content: `${team.name} has shown incredible progress this season! Their mid-season upgrade package seems to be working perfectly. What are your thoughts on their development strategy?`,
      timestamp: new Date('2024-01-22T14:30:00'),
      likes: 45,
      isLiked: false,
      replies: [
        {
          id: 'reply-1',
          user: {
            id: 'user-202',
            name: 'Tech Analyst',
            role: 'editor',
            avatar: '/avatars/strategist.jpg',
          },
          content:
            'The new floor design has reduced drag by 3.2% according to the telemetry data. Impressive engineering work!',
          timestamp: new Date('2024-01-22T16:45:00'),
          likes: 28,
          isLiked: true,
        },
      ],
    },
    {
      id: 'comment-2',
      user: {
        id: 'user-204',
        name: 'New Follower',
        role: 'user',
        avatar: '/avatars/strategist.jpg',
      },
      content: `Just started following F1 and ${team.name} caught my attention with their amazing livery and team spirit. Which driver should I pay more attention to?`,
      timestamp: new Date('2024-01-21T09:15:00'),
      likes: 33,
      isLiked: false,
    },
    {
      id: 'comment-3',
      user: {
        id: 'user-205',
        name: 'History Buff',
        role: 'admin',
        avatar: '/avatars/historian.jpg',
      },
      content: `${team.name} has ${championships} Constructors' Championships. Their legacy in F1 is truly remarkable. Do you think they can add another one this season?`,
      timestamp: new Date('2024-01-20T13:45:00'),
      likes: 67,
      isLiked: true,
    },
  ]);

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
        resolve({ likes: 50 });
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

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background with team color */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, ${team.color} 0%, black 100%)`,
          }}
        />

        {/* Team Logo Pattern Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img
            src={team.logo}
            alt={team.name}
            className="w-full max-w-2xl h-auto object-contain"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
          {/* Back Button */}
          <Link
            href="/teams"
            className="absolute top-8 left-4 inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Teams
          </Link>

          {/* Championship Position */}
          <div
            className="text-[200px] font-black leading-none mb-4 opacity-40"
            style={{ color: team.color }}
          >
            P{team.position}
          </div>

          {/* Team Logo & Name */}
          <div className="flex items-end gap-6 mb-6">
            <img src={team.logo} alt={team.name} className="h-32 w-auto" />
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
                {team.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-300">
                {team.base && (
                  <>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {team.base}
                    </span>
                    <span>•</span>
                  </>
                )}
                <span>Est. {debutYear}</span>
              </div>
            </div>
          </div>

          {/* Team Color Bar */}
          <div
            className="h-2 rounded-full w-full max-w-md"
            style={{ backgroundColor: team.color }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2"
            style={{ borderColor: `${team.color}40` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5" style={{ color: team.color }} />
              <span className="text-gray-400 text-sm uppercase">Position</span>
            </div>
            <div className="text-4xl font-black text-white">
              P{team.position}
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2"
            style={{ borderColor: `${team.color}40` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5" style={{ color: team.color }} />
              <span className="text-gray-400 text-sm uppercase">Points</span>
            </div>
            <div className="text-4xl font-black text-white">{team.points}</div>
          </div>

          <div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2"
            style={{ borderColor: `${team.color}40` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Flag className="w-5 h-5" style={{ color: team.color }} />
              <span className="text-gray-400 text-sm uppercase">Race Wins</span>
            </div>
            <div className="text-4xl font-black text-white">{raceWins}</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/50 to-gray-800 rounded-xl p-6 border-2 border-yellow-600/40">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-400 text-sm uppercase">
                Championships
              </span>
            </div>
            <div className="text-4xl font-black text-yellow-500">
              {championships}x
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Team Overview */}
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                Team Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {team.name} has been competing in Formula 1 since {debutYear}.
                {team.base && ` Based in ${team.base},`} the team has achieved{' '}
                {raceWins} race victories and {championships} constructor
                championships throughout their {totalRaces} race starts.
              </p>

              {/* Key Info Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {team.chief && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-xs uppercase font-semibold">
                        Team Principal
                      </span>
                    </div>
                    <div className="text-white font-bold text-lg">
                      {team.chief}
                    </div>
                  </div>
                )}

                {team.technicalChief && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Wrench className="w-4 h-4" />
                      <span className="text-xs uppercase font-semibold">
                        Technical Chief
                      </span>
                    </div>
                    <div className="text-white font-bold text-lg">
                      {team.technicalChief}
                    </div>
                  </div>
                )}

                {team.powerUnit && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Gauge className="w-4 h-4" />
                      <span className="text-xs uppercase font-semibold">
                        Power Unit
                      </span>
                    </div>
                    <div className="text-white font-bold text-lg">
                      {team.powerUnit}
                    </div>
                  </div>
                )}

                {team.chassis && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Wrench className="w-4 h-4" />
                      <span className="text-xs uppercase font-semibold">
                        Chassis
                      </span>
                    </div>
                    <div className="text-white font-bold text-lg">
                      {team.chassis}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drivers Section */}
            <div className="bg-gray-900 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                Current Drivers
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {teamDrivers.length > 0 ? (
                  teamDrivers.map(driver => (
                    <Link
                      key={driver.id}
                      href={`/drivers/${driver.id}`}
                      className="group bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all"
                    >
                      <div className="relative h-48">
                        <img
                          src={driver.image}
                          alt={driver.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        {driver.number && (
                          <div
                            className="absolute top-4 right-4 text-5xl font-black opacity-30"
                            style={{ color: team.color }}
                          >
                            {driver.number}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-white font-bold text-xl group-hover:text-red-500 transition-colors">
                          {driver.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {driver.country}
                          {driver.nationalityFlag &&
                            ` ${driver.nationalityFlag}`}
                        </div>
                        {driver.seasonStats?.seasonPoints !== undefined && (
                          <div className="mt-2 text-gray-300">
                            <span className="font-bold">
                              {driver.seasonStats.seasonPoints}
                            </span>{' '}
                            points
                          </div>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-500 py-8">
                    Driver information not available
                  </div>
                )}
              </div>
            </div>

            {/* ========== COMMENT SECTION ========== */}
            <div className="bg-gray-900 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                  <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-7 h-7" />
                    Fan Discussions
                  </h2>
                </div>
                <div className="text-gray-400 text-sm">
                  {comments.reduce(
                    (total, comment) =>
                      total + 1 + (comment.replies?.length || 0),
                    0
                  )}{' '}
                  comments
                </div>
              </div>

              <CommentSystem
                comments={comments}
                title={`Discuss ${team.name}'s Performance`}
                placeholder={`Share your thoughts about ${team.name}'s strategy, performance, drivers, or technical developments...`}
                emptyMessage="No discussions yet. Be the first to share your opinion about this team!"
                onAddComment={handleAddComment}
                onLikeComment={handleLikeComment}
                onAddReply={handleAddReply}
                maxLength={800}
                allowReplies={true}
                allowLikes={true}
                allowEditing={true}
                allowDeleting={true}
                showTitle={false}
                showCommentForm={true}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Stats */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" style={{ color: team.color }} />
                Team Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Debut Year</span>
                  <span className="text-white font-bold">{debutYear}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Total Races</span>
                  <span className="text-white font-bold">{totalRaces}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Race Wins</span>
                  <span className="text-white font-bold">{raceWins}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-400">Career Points</span>
                  <span className="text-white font-bold">{careerPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Championships</span>
                  <span className="text-yellow-500 font-bold">
                    {championships}x
                  </span>
                </div>
              </div>
            </div>

            {/* Technical Info */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Technical Details
              </h3>
              <div className="space-y-3">
                {team.chassis && (
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Chassis</div>
                    <div className="text-white font-semibold">
                      {team.chassis}
                    </div>
                  </div>
                )}
                {team.powerUnit && (
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Power Unit</div>
                    <div className="text-white font-semibold">
                      {team.powerUnit}
                    </div>
                  </div>
                )}
                {team.engineSupplier && (
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      Engine Supplier
                    </div>
                    <div className="text-white font-semibold">
                      {team.engineSupplier}
                    </div>
                  </div>
                )}
                {team.tireSupplier && (
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      Tire Supplier
                    </div>
                    <div className="text-white font-semibold">
                      {team.tireSupplier}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Base Location */}
            {team.base && (
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: team.color }} />
                  Headquarters
                </h3>
                <div className="text-gray-300 leading-relaxed">
                  <p className="text-lg font-semibold text-white mb-2">
                    {team.base}
                  </p>
                  <p className="text-sm">
                    The team's operations are centered at their state-of-the-art
                    facility in {team.base}.
                  </p>
                </div>
              </div>
            )}

            {/* Sponsors */}
            {team.sponsor && team.sponsor.length > 0 && (
              <div className="bg-gray-900 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Key Sponsors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {team.sponsor.map((sponsor, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-sm font-semibold"
                    >
                      {sponsor}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Website Link */}
            {team.website && (
              <a
                href={team.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 hover:from-gray-800 hover:to-gray-700 transition-all border-2"
                style={{ borderColor: `${team.color}40` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      Official Website
                    </div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Visit Site
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            )}

            {/* Team Color */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Team Identity
              </h3>
              <div>
                <div className="text-gray-400 text-sm mb-2">Primary Color</div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-gray-700"
                    style={{ backgroundColor: team.color }}
                  />
                  <div>
                    <div
                      className="text-white font-bold text-lg"
                      style={{ color: team.color }}
                    >
                      {team.color}
                    </div>
                    <div className="text-gray-400 text-xs font-mono">
                      {team.color.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Stats */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare
                  className="w-5 h-5"
                  style={{ color: team.color }}
                />
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
                  <span className="text-gray-400">Active Topics</span>
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
              </div>
            </div>
          </div>
        </div>

        {/* Historical Stats Section */}
        <div
          className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2"
          style={{ borderColor: `${team.color}20` }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Historical Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div
                className="text-5xl font-black mb-2"
                style={{ color: team.color }}
              >
                {raceWins}
              </div>
              <div className="text-gray-400 uppercase text-sm font-semibold">
                Race Victories
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-yellow-500 mb-2">
                {championships}
              </div>
              <div className="text-gray-400 uppercase text-sm font-semibold">
                World Championships
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">
                {totalRaces}
              </div>
              <div className="text-gray-400 uppercase text-sm font-semibold">
                Total Races
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">
                {debutYear ? new Date().getFullYear() - debutYear : '—'}
              </div>
              <div className="text-gray-400 uppercase text-sm font-semibold">
                Years in F1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
