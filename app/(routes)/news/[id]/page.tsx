// File: app/news/[id]/page.tsx
'use client';

import { mockNewsDetailed } from '@/lib/api/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';
import CommentSystem, { Comment } from '@/components/CommentSystem';
import { useState } from 'react';

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const item = mockNewsDetailed.find(n => n.id === params.id);

  if (!item) {
    notFound();
  }

  // State để quản lý comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment-1',
      user: {
        id: 'user-123',
        name: 'F1 Fanatic',
        role: 'editor',
        avatar: '/avatars/f1-fan.jpg',
      },
      content:
        'Great analysis! The race in Monaco was truly spectacular this year. What did everyone think about the pit strategy?',
      timestamp: new Date('2024-01-15T14:30:00'),
      likes: 42,
      isLiked: false,
      replies: [
        {
          id: 'reply-1',
          user: {
            id: 'user-456',
            name: 'Strategy Expert',
            role: 'editor',
            avatar: '/avatars/expert.jpg',
          },
          content:
            'The two-stop strategy was definitely the right call given the tire degradation. Mercedes made a brilliant decision.',
          timestamp: new Date('2024-01-15T15:45:00'),
          likes: 18,
          isLiked: true,
        },
        {
          id: 'reply-2',
          user: {
            id: 'user-789',
            name: 'Racing Fan',
            role: 'user',
            avatar: '/avatars/strategist.jpg',
          },
          content:
            'I think Ferrari should have pitted earlier. Lost crucial track position there.',
          timestamp: new Date('2024-01-15T16:20:00'),
          likes: 8,
          isLiked: false,
        },
      ],
    },
    {
      id: 'comment-2',
      user: {
        id: 'user-999',
        name: 'New F1 Fan',
        role: 'user',
        avatar: '/avatars/strategist.jpg',
      },
      content:
        'As a new fan, this article helped me understand the technical aspects better. Looking forward to more content like this!',
      timestamp: new Date('2024-01-14T09:15:00'),
      likes: 25,
      isLiked: false,
      replies: [
        {
          id: 'reply-3',
          user: {
            id: 'user-123',
            name: 'F1 Fanatic',
            role: 'editor',
            avatar: '/avatars/f1-fan.jpg',
          },
          content:
            'Welcome to the world of F1! Feel free to ask any questions.',
          timestamp: new Date('2024-01-14T10:30:00'),
          likes: 12,
          isLiked: false,
        },
      ],
    },
    {
      id: 'comment-3',
      user: {
        id: 'user-555',
        name: 'Tech Analyst',
        role: 'admin',
        avatar: '/avatars/admin.jpg',
      },
      content:
        'The aerodynamic upgrades mentioned here are fascinating. The CFD simulations must have been incredibly complex.',
      timestamp: new Date('2024-01-13T11:20:00'),
      likes: 56,
      isLiked: true,
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'race':
        return 'bg-red-600/90 text-white';
      case 'driver':
        return 'bg-blue-600/90 text-white';
      case 'team':
        return 'bg-green-600/90 text-white';
      case 'general':
        return 'bg-purple-600/90 text-white';
      default:
        return 'bg-gray-600/90 text-white';
    }
  };

  const relatedNews = mockNewsDetailed
    .filter(n => n.id !== item.id && n.category === item.category)
    .slice(0, 2);

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
        // Tìm comment để lấy số likes
        const targetComment = comments.find(c => c.id === commentId);
        const currentLikes = targetComment ? targetComment.likes : 0;
        resolve({
          likes: commentId.includes('comment')
            ? currentLikes + 1
            : currentLikes,
        });
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
      {/* Header Background */}
      <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/60 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5" />
        <div className="container mx-auto px-4 py-8 relative">
          {/* Back Button */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to News
          </Link>

          {/* Category Badge */}
          {item.category && (
            <div className="mb-4">
              <span
                className={`text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide ${getCategoryColor(item.category)}`}
              >
                {item.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {item.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.date)}</span>
            </div>

            {item.source && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className="font-medium text-white">{item.source}</span>
              </div>
            )}

            {item.author && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <User className="w-4 h-4" />
                <span>{item.author}</span>
              </div>
            )}

            {item.views && (
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <Eye className="w-4 h-4" />
                <span>{item.views.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {item.image && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-gray-700/50">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto max-h-[600px] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed text-lg space-y-6">
              {item.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Description (if available) */}
          {item.description && (
            <div className="mt-12 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-3">Summary</h3>
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* ========== COMMENT SECTION ========== */}
          <div className="mt-16 pt-12 border-t border-gray-700/50">
            <CommentSystem
              comments={comments}
              title={`Discussion: ${item.title}`}
              placeholder={`Share your thoughts about this ${item.category} news...`}
              emptyMessage="No comments yet. Be the first to share your opinion!"
              onAddComment={handleAddComment}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              onLikeComment={handleLikeComment}
              onAddReply={handleAddReply}
              maxLength={1000}
              allowReplies={true}
              allowLikes={true}
              allowEditing={true}
              allowDeleting={true}
              className="mt-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30"
              showTitle={true}
              showCommentForm={true}
            />
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-8">
                Related News
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedNews.map(relatedItem => (
                  <Link
                    key={relatedItem.id}
                    href={`/news/${relatedItem.id}`}
                    className="group bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl border border-gray-700/50 hover:border-red-500/40 transition-all duration-300 hover:transform hover:scale-[1.02] overflow-hidden"
                  >
                    {relatedItem.image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={relatedItem.image}
                          alt={relatedItem.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-white font-bold text-lg line-clamp-2 group-hover:text-red-400 transition-colors mb-2">
                        {relatedItem.title}
                      </h4>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {relatedItem.description || relatedItem.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(relatedItem.date)}</span>
                        <span className="text-red-500 font-semibold">
                          Read more
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Top */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
