"use client"

import { useRouter } from 'next/navigation'
import LeftArrow from '../core/leftArrow'

export default function TournamentHeader() {
    const router = useRouter()

    const handleLogout = () => {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/')
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="text-jText hover:opacity-80 cursor-pointer" onClick={handleLogout}>
                <LeftArrow />
            </div>
            <div className="text-jText text-xl">LOGO EMPRESA</div>
        </div>
    )
} 