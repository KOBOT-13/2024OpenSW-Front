import React from 'react';

function AiLogo({size}) {
    const containerStyle = {
        width: size, // 원하는 크기로 조정 가능
        height: 'auto', // 비율을 유지하며 높이를 자동 조정
      };
    
      const svgStyle = {
        width: '100%',
        height: 'auto',
      };
    
      return (
        <div style={containerStyle}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
            <circle cx="100" cy="100" r="90" fill="#4caf50" />
            <path d="M 60 40 L 140 40 L 160 80 L 40 80 Z" fill="#ffffff" />
            <path d="M 60 80 L 140 80 L 160 120 L 40 120 Z" fill="#ffffff" />
            <path d="M 60 120 L 140 120 L 160 160 L 40 160 Z" fill="#ffffff" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#4caf50" strokeWidth="10" />
          </svg>
        </div>
      );
}

export default AiLogo;