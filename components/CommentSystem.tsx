// File: components/comment/CommentSystem.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaHeart,
  FaRegHeart,
  FaReply,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaCrown,
  FaEdit as FaEditor,
} from 'react-icons/fa';
import { useAuthStore } from '@/lib/store/authStore';

// ========== TYPES ==========
export type UserRole = 'admin' | 'user' | 'editor' | 'moderator';

export interface CommentUser {
  id: string;
  name: string;
  avatar?: string;
  role?: UserRole;
}

export interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  timestamp: Date | string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
  parentId?: string;
  contentId?: string;
  contentType?: string;
}

export interface CommentSystemProps {
  // Core props
  comments: Comment[];
  currentUser?: CommentUser | null;

  // Callbacks
  onAddComment?: (content: string) => Promise<Comment | void>;
  onEditComment?: (
    commentId: string,
    content: string
  ) => Promise<Comment | void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
  onLikeComment?: (commentId: string) => Promise<{ likes: number } | void>;
  onAddReply?: (commentId: string, content: string) => Promise<Comment | void>;

  // UI Config
  title?: string;
  placeholder?: string;
  emptyMessage?: string;
  maxLength?: number;
  showTitle?: boolean;
  showCommentForm?: boolean;
  allowReplies?: boolean;
  allowLikes?: boolean;
  allowEditing?: boolean;
  allowDeleting?: boolean;

  // Styling
  className?: string;
  theme?: 'light' | 'dark' | 'auto';

  // Loading states
  isLoading?: boolean;
  isSubmitting?: boolean;
}

// Helper để convert auth user từ store
interface AuthUser {
  id: string;
  name: string;
  email?: string;
  role?: string;
  avatar?: string;
}

const convertAuthUserToCommentUser = (
  authUser: AuthUser | null
): CommentUser | null => {
  if (!authUser) return null;

  return {
    id: authUser.id,
    name: authUser.name,
    avatar: authUser.avatar,
    role: authUser.role as UserRole,
  };
};

// ========== HELPER FUNCTIONS ==========
const formatDate = (date: Date | string): string => {
  const now = new Date();
  const commentDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor(
    (now.getTime() - commentDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return commentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year:
      commentDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

const getUserIcon = (role?: string | null, avatar?: string) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt="User avatar"
        className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        onError={e => {
          (e.target as HTMLImageElement).src = '';
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  switch (role as UserRole) {
    case 'admin':
      return <FaCrown className="w-8 h-8 text-yellow-500" />;
    case 'editor':
    case 'moderator':
      return <FaEditor className="w-8 h-8 text-blue-500" />;
    default:
      return <FaUserCircle className="w-8 h-8 text-gray-400" />;
  }
};

const getUserBadge = (role?: string | null) => {
  switch (role as UserRole) {
    case 'admin':
      return (
        <span className="text-[10px] bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-2 py-0.5 rounded-full font-bold">
          ADMIN
        </span>
      );
    case 'editor':
      return (
        <span className="text-[10px] bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
          EDITOR
        </span>
      );
    case 'moderator':
      return (
        <span className="text-[10px] bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-0.5 rounded-full font-bold">
          MOD
        </span>
      );
    default:
      return null;
  }
};

// ========== MAIN COMPONENT ==========
export default function CommentSystem({
  // Core props
  comments: initialComments,
  currentUser,

  // Callbacks
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onAddReply,

  // UI Config
  title = 'Comments',
  placeholder = 'Add a comment...',
  emptyMessage = 'No comments yet. Be the first to comment!',
  maxLength = 500,
  showTitle = true,
  showCommentForm = true,
  allowReplies = true,
  allowLikes = true,
  allowEditing = true,
  allowDeleting = true,

  // Styling
  className = '',
  theme = 'auto',

  // Loading states
  isLoading = false,
  isSubmitting: externalIsSubmitting = false,
}: CommentSystemProps) {
  // ========== STATE ==========
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

  // Get user from auth store if not provided
  const authUser = useAuthStore(state => state.user);
  const user = currentUser || convertAuthUserToCommentUser(authUser);

  const isSubmitting = externalIsSubmitting || internalIsSubmitting;

  // ========== EFFECTS ==========
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  // ========== HANDLERS ==========
  const handleAddComment = async () => {
    if (!newComment.trim() || !user || isSubmitting) return;

    setInternalIsSubmitting(true);
    try {
      if (onAddComment) {
        const result = await onAddComment(newComment);
        if (result) {
          setComments(prev => [result as Comment, ...prev]);
        }
      } else {
        // Fallback: Create comment locally
        const newCommentObj: Comment = {
          id: `comment-${Date.now()}`,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
          },
          content: newComment,
          timestamp: new Date(),
          likes: 0,
          replies: [],
        };
        setComments(prev => [newCommentObj, ...prev]);
      }
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim() || !user || isSubmitting) return;

    setInternalIsSubmitting(true);
    try {
      if (onEditComment) {
        const result = await onEditComment(commentId, editContent);
        if (result) {
          setComments(prev =>
            prev.map(comment =>
              comment.id === commentId
                ? { ...comment, content: (result as Comment).content }
                : comment
            )
          );
        }
      } else {
        setComments(prev =>
          prev.map(comment =>
            comment.id === commentId
              ? { ...comment, content: editContent }
              : comment
          )
        );
      }
      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('Failed to edit comment:', error);
      alert('Failed to edit comment. Please try again.');
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user || isSubmitting) return;

    if (!confirm('Are you sure you want to delete this comment?')) return;

    setInternalIsSubmitting(true);
    try {
      if (onDeleteComment) {
        await onDeleteComment(commentId);
      }
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
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Failed to delete comment. Please try again.');
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user || isSubmitting) return;

    setInternalIsSubmitting(true);
    try {
      if (onLikeComment) {
        const result = await onLikeComment(commentId);
        if (result) {
          setComments(prev =>
            prev.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    likes: result.likes,
                    isLiked: !comment.isLiked,
                  }
                : comment
            )
          );
        }
      } else {
        setComments(prev =>
          prev.map(comment =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes: comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1,
                  isLiked: !comment.isLiked,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error('Failed to like comment:', error);
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  const handleAddReply = async (commentId: string) => {
    if (!replyContent.trim() || !user || isSubmitting) return;

    setInternalIsSubmitting(true);
    try {
      if (onAddReply) {
        const result = await onAddReply(commentId, replyContent);
        if (result) {
          setComments(prev =>
            prev.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: [...(comment.replies || []), result as Comment],
                  }
                : comment
            )
          );
        }
      } else {
        const newReply: Comment = {
          id: `reply-${Date.now()}`,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
          },
          content: replyContent,
          timestamp: new Date(),
          likes: 0,
        };

        setComments(prev =>
          prev.map(comment =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), newReply],
                }
              : comment
          )
        );
      }
      setReplyingTo(null);
      setReplyContent('');
    } catch (error) {
      console.error('Failed to add reply:', error);
      alert('Failed to add reply. Please try again.');
    } finally {
      setInternalIsSubmitting(false);
    }
  };

  // ========== RENDER FUNCTIONS ==========
  const renderComment = (comment: Comment, isReply = false, depth = 0) => {
    const isOwner = user?.id === comment.user.id;
    const isEditing = editingComment === comment.id;
    const isReplying = replyingTo === comment.id;

    const canEdit = allowEditing && isOwner;
    const canDelete =
      allowDeleting &&
      (isOwner || user?.role === 'admin' || user?.role === 'moderator');
    const canReply = allowReplies && user && depth < 3;

    const maxWidth = `calc(100% - ${depth * 40}px)`;

    return (
      <div
        key={comment.id}
        className={`${isReply ? 'ml-10 mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700' : 'mb-6'}`}
        style={{ maxWidth: depth > 0 ? maxWidth : '100%' }}
      >
        <div className="flex items-start">
          {/* Avatar */}
          <div className="flex-shrink-0 mr-3">
            {getUserIcon(comment.user.role, comment.user.avatar)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50">
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {comment.user.name}
                    </h4>
                    {getUserBadge(comment.user.role)}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.timestamp)}
                  </span>
                </div>

                {/* Actions */}
                {(canEdit || canDelete) && (
                  <div className="flex items-center gap-2">
                    {canEdit && !isEditing && (
                      <button
                        onClick={() => {
                          setEditingComment(comment.id);
                          setEditContent(comment.content);
                        }}
                        className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 p-1 transition-colors"
                        disabled={isSubmitting}
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1 transition-colors"
                        disabled={isSubmitting}
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Comment Content */}
              {isEditing ? (
                <div className="mb-3">
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    rows={3}
                    maxLength={maxLength}
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {editContent.length}/{maxLength}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50 flex items-center gap-1.5 transition-colors"
                        disabled={isSubmitting || !editContent.trim()}
                      >
                        <FaCheck size={12} />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingComment(null);
                          setEditContent('');
                        }}
                        className="px-3 py-1.5 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 flex items-center gap-1.5 transition-colors"
                        disabled={isSubmitting}
                      >
                        <FaTimes size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {comment.content}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                {/* Like button */}
                {allowLikes && (
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors group"
                    disabled={isSubmitting || !user}
                    title="Like"
                  >
                    {comment.isLiked ? (
                      <FaHeart
                        className="text-red-500 group-hover:scale-110 transition-transform"
                        size={14}
                      />
                    ) : (
                      <FaRegHeart
                        className="group-hover:scale-110 transition-transform"
                        size={14}
                      />
                    )}
                    <span className="text-xs font-medium">{comment.likes}</span>
                  </button>
                )}

                {/* Reply button */}
                {canReply && !isReply && depth < 3 && (
                  <button
                    onClick={() => {
                      setReplyingTo(isReplying ? null : comment.id);
                      setReplyContent('');
                    }}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm group"
                    disabled={isSubmitting}
                    title="Reply"
                  >
                    <FaReply
                      className="group-hover:scale-110 transition-transform"
                      size={12}
                    />
                    <span>Reply</span>
                  </button>
                )}
              </div>
            </div>

            {/* Reply input */}
            {isReplying && user && (
              <div className="mt-3">
                <div className="flex gap-2">
                  <div className="flex-shrink-0">
                    {getUserIcon(user.role, user.avatar)}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                      rows={2}
                      maxLength={maxLength}
                      disabled={isSubmitting}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {replyContent.length}/{maxLength}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddReply(comment.id)}
                          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50 transition-colors"
                          disabled={isSubmitting || !replyContent.trim()}
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                          className="px-3 py-1.5 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recursively render replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                {comment.replies.map(reply =>
                  renderComment(reply, true, depth + 1)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ========== LOADING STATE ==========
  if (isLoading) {
    return (
      <div
        className={`animate-pulse bg-white dark:bg-gray-900/50 rounded-xl shadow-lg p-6 ${className}`}
      >
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  const totalComments = comments.reduce(
    (total, comment) => total + 1 + (comment.replies?.length || 0),
    0
  );

  return (
    <div
      className={`bg-white dark:bg-gray-900/50 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm ${className}`}
    >
      {/* Title */}
      {showTitle && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {totalComments > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalComments} {totalComments === 1 ? 'comment' : 'comments'}
            </span>
          )}
        </div>
      )}

      {/* Add Comment Form */}
      {showCommentForm && user ? (
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              {getUserIcon(user.role, user.avatar)}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white resize-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                rows={3}
                maxLength={maxLength}
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {newComment.length}/{maxLength}
                </span>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  disabled={isSubmitting || !newComment.trim()}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Posting...
                    </span>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : showCommentForm && !user ? (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg text-center border border-gray-200 dark:border-gray-700/50">
          <p className="text-gray-600 dark:text-gray-400">
            Please{' '}
            <Link
              href="/signin"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-2"
            >
              sign in
            </Link>{' '}
            to leave a comment.
          </p>
        </div>
      ) : null}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => renderComment(comment, false, 0))
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-300 dark:text-gray-600 mb-4">
              <FaUserCircle className="w-16 h-16 mx-auto opacity-40" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
              {emptyMessage}
            </p>
            {showCommentForm && !user && (
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Sign in to start the conversation
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
