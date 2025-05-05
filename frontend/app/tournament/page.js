'use client'

import TournamentList from "@/components/tournament/TournamentList"
import TournamentHeader from "@/components/tournament/TournamentHeader"

export default function TournamentPage() {
    return (
        <div className="min-h-screen bg-black p-4">
            <div className="max-w-[1000px] mx-auto">
                <TournamentHeader />
                <TournamentList />
            </div>
        </div>
    )
}
