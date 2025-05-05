'use client'

import { useState } from 'react'
import CreateTournamentModal from './CreateTournamentModal'

const TournamentActions = ({  setTournaments, setErrorList, setLoadingList, handleGetTournaments }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-[#e91e63] p-4">
                <div className="flex justify-center items-center">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-48 bg-[#f0e68c] text-black font-bold py-2 px-4 rounded"
                    >
                        Crear Torneo
                    </button>
                </div>
            </div>

            <CreateTournamentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleGetTournaments={handleGetTournaments} 
            />
        </>
    )
}

export default TournamentActions 