import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ size = 48, showText = true }) => {
  // Generate unique IDs for gradients to avoid conflicts
  const gradientId1 = `logoGradient1-${size}`;
  const gradientId2 = `logoGradient2-${size}`;
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {/* Colorful Logo SVG - Abstract butterfly/stylized A design */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={gradientId1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id={gradientId2} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        
        {/* Main abstract shape - butterfly/stylized A */}
        <path
          d="M24 6 L34 18 L30 18 L26 12 L22 12 L18 18 L14 18 Z M24 10 L22 12 L26 12 Z M23 16 L23 28 L25 28 L25 16 Z"
          fill={`url(#${gradientId1})`}
        />
        
        {/* Left wing accent */}
        <ellipse cx="14" cy="30" rx="6" ry="8" fill={`url(#${gradientId2})`} opacity="0.8" />
        
        {/* Right wing accent */}
        <ellipse cx="34" cy="30" rx="6" ry="8" fill="#10b981" opacity="0.7" />
        
        {/* Center accent */}
        <circle cx="24" cy="36" r="4" fill="#3b82f6" opacity="0.6" />
      </svg>
      
      {showText && (
        <Box
          component="span"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
            color: '#1e293b', // Fallback color
          }}
        >
          AI Interview Prep
        </Box>
      )}
    </Box>
  );
};

export default Logo;

