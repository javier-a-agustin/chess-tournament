import React from 'react'

const Footer = ({ children, className }) => {
    return (
        <div className={`bg-jRedFooter p-2 sm:p-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 h-[150px] ${className}`}>
            {children}
    </div>
    )
}

export default Footer