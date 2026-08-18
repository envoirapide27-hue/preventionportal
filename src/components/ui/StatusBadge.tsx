import React from 'react';

type BadgeVariant =
  | 'active' | 'draft' | 'review' | 'investigation' | 'charged' |'convicted'| 'closed' | 'archived' | 'published' | 'unpublished' |'wanted' | 'notice' | 'pending' | 'paid' | 'overdue' | 'cancelled';

const variantClasses: Record<BadgeVariant, string> = {
  active: 'badge-active',
  draft: 'badge-draft',
  review: 'badge-review',
  investigation: 'badge-investigation',
  charged: 'badge-charged',
  convicted: 'badge-convicted',
  closed: 'badge-closed',
  archived: 'badge-draft',
  published: 'badge-published',
  unpublished: 'badge-unpublished',
  wanted: 'badge-wanted',
  notice: 'badge-investigation',
  pending: 'badge-review',
  paid: 'badge-active',
  overdue: 'badge-charged',
  cancelled: 'badge-closed',
};

const variantLabels: Record<BadgeVariant, string> = {
  active: 'Active',
  draft: 'Draft',
  review: 'Under Review',
  investigation: 'Under Investigation',
  charged: 'Charged',
  convicted: 'Convicted',
  closed: 'Closed',
  archived: 'Archived',
  published: 'Published',
  unpublished: 'Unpublished',
  wanted: 'Wanted',
  notice: 'Notice Issued',
  pending: 'Pending',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ variant, label, size = 'md' }: StatusBadgeProps) {
  const classes = variantClasses[variant] || variantClasses.draft;
  const displayLabel = label || variantLabels[variant] || variant;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${classes}`}>
      {displayLabel}
    </span>
  );
}