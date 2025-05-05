"use client"

import { useRouter } from 'next/navigation'

export default function TournamentHeader() {
    const router = useRouter()

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/')
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="text-[#f0e68c] hover:opacity-80 cursor-pointer" onClick={handleLogout}>
                <div className="text-3xl">←</div>
            </div>
            <div className="text-[#f0e68c] text-xl">LOGO EMPRESA</div>
        </div>
    )
} 