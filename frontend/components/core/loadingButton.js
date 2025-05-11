'use client'

import React, { useState } from 'react'

const LoadingButton = ({ label, className }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
    };

    return (
        <button
            className={`${className} relative disabled:opacity-70 disabled:cursor-not-allowed`}
            onClick={handleClick}
            disabled={isLoading}
        >
            <div className="flex items-center justify-center">
                {label}
                {isLoading && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
            </div>
        </button>
    )
}

export default LoadingButton