'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Meh, CheckCircle2, Send, X, Loader2 } from 'lucide-react';

interface DiagramFeedbackWidgetProps {
  diagramId: string;
  versionId?: string | null;
  onFeedbackSubmitted?: () => void;
}

type RatingType = 'thumbs_up' | 'thumbs_down' | 'neutral' | null;

const POSITIVE_CHIPS = [
  'Accurate layout',
  'Perfect component choice',
  'Fast generation',
  'Great cloud architecture',
  'Clear connections',
];

const NEGATIVE_CHIPS = [
  'Hallucinated components',
  'Missing connections',
  'Wrong cloud services',
  'Cluttered layout',
  'Incorrect labels',
];

export default function DiagramFeedbackWidget({
  diagramId,
  versionId,
  onFeedbackSubmitted,
}: DiagramFeedbackWidgetProps) {
  const [rating, setRating] = useState<RatingType>(null);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleRatingClick = async (clickedRating: 'thumbs_up' | 'thumbs_down' | 'neutral') => {
    setRating(clickedRating);
    setSelectedChips([]);
    setComment('');

    if (clickedRating === 'neutral') {
      // Neutral submits instantly
      await submitFeedback(clickedRating, [], '');
    } else {
      setIsOpen(true);
    }
  };

  const submitFeedback = async (
    targetRating: 'thumbs_up' | 'thumbs_down' | 'neutral',
    tags: string[],
    freeText: string
  ) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/diagrams/${diagramId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          versionId: versionId || null,
          rating: targetRating,
          feedbackTags: tags,
          freeTextComment: freeText.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setToastMessage('Feedback recorded!');
      setIsOpen(false);
      setRating(null);
      setSelectedChips([]);
      setComment('');
      if (onFeedbackSubmitted) onFeedbackSubmitted();

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error submitting feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    submitFeedback(rating, selectedChips, comment);
  };

  // Validation rule for Thumbs Down: must select at least 1 chip or enter text
  const isThumbsDownValid =
    rating === 'thumbs_down' ? selectedChips.length > 0 || comment.trim().length > 0 : true;

  const currentChips = rating === 'thumbs_up' ? POSITIVE_CHIPS : NEGATIVE_CHIPS;

  return (
    <div className="relative inline-block text-left" id="diagram-feedback-widget">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-lg shadow-xl backdrop-blur-md animate-slide-down">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Feedback Buttons Trigger */}
      <div className="flex items-center gap-1 bg-[#0d1322]/90 border border-panel-border/60 p-1 rounded-lg shadow-sm backdrop-blur-sm">
        <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:inline">
          Rate AI Architecture
        </span>
        <button
          type="button"
          id="feedback-thumbs-up-btn"
          onClick={() => handleRatingClick('thumbs_up')}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            rating === 'thumbs_up'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400'
          }`}
          title="Good Architecture (Thumbs Up)"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          id="feedback-neutral-btn"
          onClick={() => handleRatingClick('neutral')}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            rating === 'neutral'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : 'hover:bg-amber-500/10 text-slate-400 hover:text-amber-400'
          }`}
          title="Neutral Evaluation"
        >
          <Meh className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          id="feedback-thumbs-down-btn"
          onClick={() => handleRatingClick('thumbs_down')}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            rating === 'thumbs_down'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'hover:bg-rose-500/10 text-slate-400 hover:text-rose-400'
          }`}
          title="Needs Improvement (Thumbs Down)"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded Feedback Modal / Popover */}
      {isOpen && rating && (
        <div className="absolute right-0 top-10 mt-2 w-80 bg-[#0b101d] border border-panel-border/80 rounded-xl p-4 shadow-2xl z-40 backdrop-blur-xl animate-fade-in space-y-3">
          <div className="flex items-center justify-between border-b border-panel-border/50 pb-2">
            <div className="flex items-center gap-1.5">
              {rating === 'thumbs_up' ? (
                <ThumbsUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <ThumbsDown className="w-4 h-4 text-rose-400" />
              )}
              <h4 className="text-xs font-bold text-slate-200">
                {rating === 'thumbs_up' ? 'What worked well?' : 'What needs improvement?'}
              </h4>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setRating(null);
              }}
              className="text-slate-500 hover:text-slate-300 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-3">
            {/* Multi-select Chips */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                {rating === 'thumbs_down'
                  ? 'Select Issues (Required)'
                  : 'Select Positive Aspects (Optional)'}
              </label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentChips.map((chip) => {
                  const isSelected = selectedChips.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? rating === 'thumbs_up'
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                            : 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold'
                          : 'bg-slate-900/60 border-panel-border/60 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Free Text Comment */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                Additional Comments
              </label>
              <textarea
                id="feedback-comment-textarea"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  rating === 'thumbs_down'
                    ? 'Explain what went wrong or how to improve...'
                    : 'Add suggestions or praise...'
                }
                className="w-full bg-[#070a13] border border-panel-border/60 rounded-lg p-2 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-teal-400/50 resize-none"
              />
            </div>

            {/* Validation warning for Thumbs Down */}
            {rating === 'thumbs_down' && !isThumbsDownValid && (
              <p className="text-[10px] text-rose-400 animate-pulse font-medium">
                Please select at least one tag or enter a comment to submit negative feedback.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-feedback-btn"
              disabled={isSubmitting || (rating === 'thumbs_down' && !isThumbsDownValid)}
              className="w-full flex items-center justify-center gap-1.5 bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs py-2 px-3 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
