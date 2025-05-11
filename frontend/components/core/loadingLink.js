'use client'

import Link from "next/link"
import React, { useState } from 'react'

const LoadingLink = ({ label, className, href }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
    };

    return (
        <Link
            href={href}
            className={`${className} relative disabled:opacity-70 disabled:cursor-not-allowed`}
            onClick={handleClick}
            disabled={isLoading}
        >
            <div className="flex items-center justify-center">
                {label}
                {isLoading && (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
            </div>
        </Link>
    )
}

export default LoadingLink