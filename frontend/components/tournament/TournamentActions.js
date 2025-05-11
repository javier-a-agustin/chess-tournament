'use client'

import { useState } from 'react'
import CreateTournamentModal from './CreateTournamentModal'
import Footer from '../core/footer'

const TournamentActions = ({  setTournaments, setErrorList, setLoadingList, handleGetTournaments }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Footer className="fixed bottom-0 left-0 right-0">
                <div className="flex justify-center items-center gap-4">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-48 bg-jBeige text-black font-bold py-2 px-4 rounded"
                    >
                        Crear Torneo
                    </button>

                    <p className="text-jText text-2xl font-bold">TORNEOS</p>
                </div>
            </Footer>

            <CreateTournamentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleGetTournaments={handleGetTournaments} 
            />
        </>
    )
}

export default TournamentActions 