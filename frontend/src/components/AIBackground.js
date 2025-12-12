import React from 'react';
import { Box } from '@mui/material';

const AIBackground = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.15,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Gradient Background */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" />

        {/* Smartphone (Left) */}
        <g transform="translate(100, 200)">
          {/* Phone body */}
          <rect x="0" y="0" width="120" height="200" rx="15" fill="#374151" />
          <rect x="10" y="20" width="100" height="160" rx="5" fill="#ffffff" />
          {/* Buttons */}
          <rect x="115" y="40" width="8" height="20" rx="2" fill="#6b7280" />
          <rect x="115" y="70" width="8" height="20" rx="2" fill="#6b7280" />
          <rect x="115" y="100" width="8" height="20" rx="2" fill="#6b7280" />
        </g>

        {/* Chatbot Robot emerging from phone */}
        <g transform="translate(180, 150)">
          {/* Robot body */}
          <ellipse cx="0" cy="20" rx="35" ry="50" fill="#ffffff" />
          <ellipse cx="0" cy="20" rx="30" ry="45" fill="#f3f4f6" />
          
          {/* Robot head */}
          <ellipse cx="0" cy="-30" rx="25" ry="30" fill="#ffffff" />
          <rect x="-20" y="-50" width="40" height="25" rx="5" fill="#374151" />
          
          {/* Face */}
          <path d="M -8 -40 Q -8 -35 -4 -35 Q 0 -35 0 -38 Q 0 -35 4 -35 Q 8 -35 8 -40" stroke="#10b981" strokeWidth="2" fill="none" />
          <ellipse cx="-6" cy="-45" rx="2" ry="2" fill="#10b981" />
          <ellipse cx="6" cy="-45" rx="2" ry="2" fill="#10b981" />
          <path d="M -4 -38 Q 0 -35 4 -38" stroke="#10b981" strokeWidth="2" fill="none" />
          
          {/* Headset */}
          <ellipse cx="0" cy="-50" rx="20" ry="8" fill="#374151" />
          <line x1="15" y1="-50" x2="25" y2="-45" stroke="#374151" strokeWidth="3" />
          <circle cx="25" cy="-45" r="4" fill="#374151" />
          
          {/* Arms */}
          <ellipse cx="-30" cy="10" rx="12" ry="25" fill="#ffffff" />
          <ellipse cx="-30" cy="10" rx="8" ry="20" fill="#f3f4f6" />
          <ellipse cx="-35" cy="25" rx="8" ry="12" fill="#ffffff" />
          
          <ellipse cx="30" cy="10" rx="12" ry="25" fill="#ffffff" />
          <ellipse cx="30" cy="10" rx="8" ry="20" fill="#f3f4f6" />
          <ellipse cx="35" cy="25" rx="8" ry="12" fill="#ffffff" />
        </g>

        {/* User (Right) */}
        <g transform="translate(700, 300)">
          {/* Cushion */}
          <circle cx="0" cy="80" r="60" fill="#e5e7eb" />
          
          {/* User body */}
          <ellipse cx="0" cy="50" rx="25" ry="35" fill="#ffffff" />
          
          {/* Head */}
          <circle cx="0" cy="-10" r="18" fill="#fbbf24" />
          
          {/* Hair */}
          <path d="M -15 -10 Q -18 -25 -12 -30 Q -5 -28 0 -25 Q 5 -28 12 -30 Q 18 -25 15 -10" fill="#1f2937" />
          
          {/* Body/Clothes */}
          <rect x="-20" y="20" width="40" height="50" rx="5" fill="#374151" />
          <rect x="-25" y="15" width="50" height="40" rx="8" fill="#e5e7eb" />
          
          {/* Legs */}
          <rect x="-12" y="60" width="10" height="40" rx="5" fill="#4b5563" />
          <rect x="2" y="60" width="10" height="40" rx="5" fill="#4b5563" />
          
          {/* Phone in hands */}
          <rect x="-8" y="25" width="16" height="24" rx="2" fill="#374151" />
          <rect x="-6" y="27" width="12" height="20" rx="1" fill="#ffffff" />
          
          {/* Question marks */}
          <text x="-30" y="-5" fontSize="20" fill="#ffffff" opacity="0.7">?</text>
          <text x="30" y="-10" fontSize="18" fill="#ffffff" opacity="0.7">?</text>
          <text x="-25" y="-25" fontSize="16" fill="#ffffff" opacity="0.7">?</text>
        </g>

        {/* Speech bubbles */}
        <g transform="translate(250, 100)">
          {/* Large bubble */}
          <rect x="0" y="0" width="80" height="40" rx="8" fill="#ffffff" opacity="0.9" />
          <rect x="10" y="10" width="50" height="6" rx="3" fill="#ec4899" />
          <rect x="10" y="22" width="30" height="6" rx="3" fill="#9ca3af" />
          <path d="M 20 40 L 30 50 L 20 50 Z" fill="#ffffff" opacity="0.9" />
          
          {/* Small bubble */}
          <rect x="90" y="20" width="40" height="30" rx="6" fill="#ffffff" opacity="0.9" />
          <circle cx="105" cy="35" r="3" fill="#9ca3af" />
          <circle cx="115" cy="35" r="3" fill="#9ca3af" />
          <circle cx="125" cy="35" r="3" fill="#9ca3af" />
        </g>

        {/* Envelope icons */}
        <g transform="translate(280, 80)">
          <rect x="0" y="0" width="20" height="15" rx="2" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M 0 0 L 10 8 L 20 0" stroke="#ffffff" strokeWidth="2" fill="none" />
        </g>
        <g transform="translate(310, 75)">
          <rect x="0" y="0" width="20" height="15" rx="2" fill="none" stroke="#ffffff" strokeWidth="2" />
          <path d="M 0 0 L 10 8 L 20 0" stroke="#ffffff" strokeWidth="2" fill="none" />
        </g>

        {/* Gear icons */}
        <g transform="translate(80, 100)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#ffffff" strokeWidth="2" />
          <rect x="-2" y="-14" width="4" height="6" fill="#ffffff" />
          <rect x="-2" y="8" width="4" height="6" fill="#ffffff" />
          <rect x="-14" y="-2" width="6" height="4" fill="#ffffff" />
          <rect x="8" y="-2" width="6" height="4" fill="#ffffff" />
        </g>
        <g transform="translate(110, 120)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#ffffff" strokeWidth="2" />
          <rect x="-2" y="-14" width="4" height="6" fill="#ffffff" />
          <rect x="-2" y="8" width="4" height="6" fill="#ffffff" />
          <rect x="-14" y="-2" width="6" height="4" fill="#ffffff" />
          <rect x="8" y="-2" width="6" height="4" fill="#ffffff" />
        </g>
      </svg>
    </Box>
  );
};

export default AIBackground;

