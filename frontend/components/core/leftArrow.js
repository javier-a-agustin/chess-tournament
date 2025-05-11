import React from 'react'

const LeftArrow = ({ className = "" }) => (
    <div className={`w-10 h-10 flex items-center justify-center ${className}`}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <polygon
                points="22,6 10,16 22,26"
                fill="#F7E3A1"
                stroke="#F7E3A1"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    </div>
)

export default LeftArrow