'use client';

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface RichTextProps {
  content?: string | null;
  className?: string;
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null;

  // Check if content contains HTML tags
  const containsHtml = /<[a-z][\s\S]*>/i.test(content);

  if (!containsHtml) {
    // If it's plain text, render paragraphs cleanly
    return (
      <div className={`prose-content ${className}`}>
        {content.split('\n\n').map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    );
  }

  // Sanitize HTML strictly before rendering
  const sanitizedHtml = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'strong', 'em', 'b', 'i', 'u', 's', 'strike',
      'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'br', 'span', 'blockquote', 'code', 'pre', 'hr'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'title'],
  });

  return (
    <div
      className={`prose-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
