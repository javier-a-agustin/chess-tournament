'use client'

import { useState, useEffect } from 'react'
import { getTournaments } from '@/lib/api/api'
import { useRouter } from 'next/navigation'
import TournamentActions from './TournamentActions'

const getModeLabel = (mode) => {
    const modeMap = {
        'classical': 'Clásico (>60 min)',
        'rapid': 'Rápido (10-60 min)',
        'blitz': 'Blitz (3-10 min)',
        'bullet': 'Bala (<3 min)',
        'hyperbullet': 'Ultrabala (30 seg)'
    };
    return modeMap[mode] || mode;
};

const TournamentList = () => {
    const [tournaments, setTournaments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleGetTournaments = async () => {
        setLoading(true)
        try {
            const response = await getTournaments()
            setTournaments(response.data)
            setError(null)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }   

    useEffect( () => {
        handleGetTournaments()
    }, [])

    const isManyTournaments = tournaments.length > 10;

    return (
        <div
            className={`bg-[#1a1a1a] rounded-lg p-6 mb-40`}
        >
            <div className="hidden md:grid grid-cols-5 gap-4 text-jText font-bold mb-4">
                <div>TORNEO</div>
                <div>FECHA DE INICIO</div>
                <div>MODO</div>
                <div>PREMIO</div>
                <div>ESTADO</div>
            </div>

            {loading && (
                <div className="text-center mt-8">
                    <p className="text-2xl font-bold text-jText">Cargando torneos...</p>
                </div>
            )}
            {error && !loading && <div>Error al cargar torneos: {error}</div>}

            {!loading && !error && tournaments.map((tournament) => (
                <div
                    key={tournament.code}
                    className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 mt-2 text-jText py-2 border-t border-[#eee] md:items-center md:"
                >
                    <div className="md:hidden flex justify-between">
                        <span className="font-bold">TORNEO:</span>
                        <span className="truncate cursor-pointer" onClick={() => router.push(`/tournament/${tournament.code}`)}>{tournament.name}</span>
                    </div>
                    <div className="md:hidden flex justify-between">
                        <span className="font-bold">FECHA DE INICIO:</span>
                        <span>{new Date(tournament.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="md:hidden flex justify-between">
                        <span className="font-bold">MODO:</span>
                        <span>{getModeLabel(tournament.mode)}</span>
                    </div>
                    <div className="md:hidden flex justify-between">
                        <span className="font-bold">PREMIO:</span>
                        <span>{tournament.prize || 'N/A'}</span>
                    </div>
                    <div className="md:hidden flex justify-between">
                        <span className="font-bold">ESTADO:</span>
                        <span>{tournament.status}</span>
                    </div>

                    <div className="hidden md:block truncate cursor-pointer" onClick={() => router.push(`/tournament/${tournament.code}`)}>{tournament.name}</div>
                    <div className="hidden md:block">{new Date(tournament.start_date).toLocaleDateString()}</div>
                    <div className="hidden md:block">{getModeLabel(tournament.mode)}</div>
                    <div className="hidden md:block">{tournament.prize || 'N/A'}</div>
                    <div className="hidden md:block">{tournament.status}</div>
                </div>
            ))}

            {tournaments.length === 0 && !loading && !error && (
                <div className="text-center mt-8">
                    <p className="text-2xl font-bold text-jText">No hay torneos disponibles</p>
                </div>
            )}

            <TournamentActions
                handleGetTournaments={handleGetTournaments}
            />
        </div>
    )
}

export default TournamentList