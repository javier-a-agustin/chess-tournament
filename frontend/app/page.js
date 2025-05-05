import Link from "next/link"
import './globals.css'

export default function MainPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black p-4">
            <div className="relative w-full max-w-[700px] h-auto min-h-[500px] transform bg-[#f0e68c] flex justify-center rounded-lg">

                <div className="absolute inset-0 flex flex-col items-center justify-center transform p-4 sm:p-8 md:p-12">
                    <div className="text-center mb-4 sm:mb-6">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-black">LOGO EMPRESA</p>
                    </div>

                    <p className="text-xs sm:text-xs text-center mb-6 sm:mb-10 max-w-sm leading-relaxed text-black/80">
                        A new way to play the consecrated game of chess. A decentralized platform for everyone who wants to earn money playing the most beloved game in the history of mankind. Scholarships, tournaments, chip system, ratings, integrated rapido or blitz chess mode and much more in the future.A new way to play the consecrated game of chess. A decentralized platform for everyone who wants to earn money playing the most beloved game in the history of mankind. Scholarships, tournaments, chip system, ratings, integrated rapido or blitz chess mode and much more in the future.more in the future. aca
                    </p>

                    <div className="w-full space-y-3 sm:space-y-4">

                        <div className="flex flex-col items-center justify-center">
                            <Link href="/login" className="text-black hover:underline flex-1 p-1">
                                <button className="w-full max-w-xs py-2 sm:py-3 bg-black text-[#f0e68c] font-bold tracking-widest text-base sm:text-lg hover:bg-black/90 transition-colors rounded m-3">LOGIN</button>
                            </Link>
                            <Link href="/signup" className="text-black hover:underline flex-1 p-1"> 
                                <button className="w-full max-w-xs py-2 sm:py-3 bg-black text-[#f0e68c] font-bold tracking-widest text-base sm:text-lg hover:bg-black/90 transition-colors rounded m-3">REGISTER</button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-0 text-xs mt-4 sm:mt-6 font-medium">
                            <Link href="#" className="text-black hover:underline flex-1 p-1">
                                <button className="w-full py-1.5 sm:py-2 bg-black text-[#f0e68c] font-bold tracking-widest text-xs sm:text-sm hover:bg-black/90 transition-colors rounded p-1">TERMINOS Y CONDIC</button>
                            </Link>
                            <Link href="#" className="text-black hover:underline flex-1 p-1">
                                <button className="w-full py-1.5 sm:py-2 bg-black text-[#f0e68c] font-bold tracking-widest text-xs sm:text-sm hover:bg-black/90 transition-colors rounded p-1">MANUAL DE USUARIO</button>
                            </Link>
                            <Link href="#" className="text-black hover:underline flex-1 p-1">
                                <button className="w-full py-1.5 sm:py-2 bg-black text-[#f0e68c] font-bold tracking-widest text-xs sm:text-sm hover:bg-black/90 transition-colors rounded p-1">FAQ</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
