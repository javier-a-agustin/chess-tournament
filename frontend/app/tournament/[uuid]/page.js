'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTournamentDetail, registerInTournament } from '@/lib/api/api'
import { useRouter } from 'next/navigation'

const formatDate = (dateString) => {
    if (!dateString) return '00:00';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
};

export default function TournamentDetailPage() {
    const { uuid } = useParams();
    const [tournamentData, setTournamentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const result = await getTournamentDetail(uuid);
            if (result.success) {
                setTournamentData(result.data);
            } else {
                setError(result.errorMessage);
            }
        } catch (err) {
            setError('Failed to load tournament data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [uuid]);

    const handleSignup = () => {
        setShowModal(true);
    };

    const handleConfirm = async () => {
        const response = await registerInTournament(uuid);
        if (response.success) {
            fetchData();
        } else {
            setAlert(response.errorMessage);
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-yellow-200 text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-yellow-200 text-xl">{error}</div>
            </div>
        );
    }

    if (!tournamentData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-yellow-200 text-xl">No tournament data found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-black">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 gap-2 sm:gap-0">
                <button className="self-start sm:self-auto" onClick={() => router.back()}>
                    <span className="text-yellow-200 text-4xl">&#8592;</span>
                </button>
                <div className="text-center flex-1">
                    <span className="text-yellow-200 text-lg sm:text-xl font-bold">COMIENZA</span>
                    <span className="ml-2 sm:ml-4 text-yellow-200 text-lg sm:text-xl">{formatDate(tournamentData?.start_date)}</span>
                </div>
                <div className="flex gap-2 items-center mt-2 sm:mt-0">
                    <span className="text-yellow-200 font-bold text-sm sm:text-base">{tournamentData.name || 'LOGO EMPRESA'}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-0">
                <div className="flex flex-col md:flex-row w-full max-w-4xl gap-4">
                    {/* Participantes */}
                    <div className="flex-1 bg-[#181818] rounded p-2 sm:p-4 mb-4 md:mb-0">
                        <div className="flex font-bold text-yellow-200 mb-2 text-xs sm:text-base">
                            <div className="w-1/2">PARTICIPANTES</div>
                            <div className="w-1/4">ELO</div>
                            <div className="w-1/4">PUNTOS</div>
                        </div>
                        {tournamentData.participants?.map((participant) => (
                            <div key={participant.id} className="flex items-center text-white text-xs sm:text-base">
                                <span className="mr-2 text-orange-400">👤</span>
                                <span className="w-1/2">{participant.username}</span>
                                <span className="w-1/4">{participant.elo}</span>
                                <span className="w-1/4">{participant.points}</span>
                            </div>
                        ))}
                    </div>
                    {/* Encuentros en Progreso */}
                    <div className="flex-1 bg-[#181818] rounded p-2 sm:p-4">
                        <div className="font-bold text-yellow-200 mb-2 text-xs sm:text-base">ENCUENTROS EN PROGRESO</div>
                        {tournamentData.matches?.map((match) => (
                            <div key={match.match_id} className="flex flex-wrap items-center text-white text-xs sm:text-base mb-2">
                                <span className="mr-2 text-orange-400">👤</span>
                                <span>{match.player1_username}</span>
                                <span className="mx-2 text-yellow-200">VS</span>
                                <span className="mr-2 text-blue-400">👤</span>
                                <span>{match.player2_username}</span>
                                <span className="ml-4 text-yellow-200">👁️</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#e83e5b] p-2 sm:p-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                {alert && <div className="text-white text-center text-sm">{alert}</div>}
                <button 
                    onClick={handleSignup}
                    className="bg-[#f0e68c] text-black font-bold py-2 px-4 rounded"
                >
                    <span className="text-xl">Anotarme</span>
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-[#181818] p-6 rounded-lg max-w-sm w-full">
                        <p className="text-yellow-200 text-center text-lg mb-6">
                            ¿Estás seguro que te querés anotar al torneo?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleConfirm}
                                className="bg-[#e83e5b] text-white font-bold py-2 px-6 rounded hover:bg-[#d12d4a]"
                            >
                                Sí
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-700"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
