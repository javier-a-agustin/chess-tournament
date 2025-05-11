import './globals.css'
import '../styles/index.css'
import Link from "next/link"
import LoadingButton from "@/components/core/loadingButton"

export default function MainPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black p-4">
            <div className="relative w-[620px] h-[620px] bg-jBeige flex items-center justify-center rotation-main">
                <div className="absolute top-[20px] left-[20px]  w-[140px] h-[140px] bg-black rounded-3xl flex items-center justify-center hidden-mobile">
                </div>
                <div className="flex flex-col items-center justify-center w-full px-8 pt-10 rotation-negative">
                    <div className="text-left mb-2 text-mobile">
                        <p className="text-[44px] leading-none font-bold tracking-widest text-black">LOGO<br />EMPRESA</p>
                        <p className="text-[10px] text-justify mb-6 max-w-[330px] leading-tight text-black/90 font-medium mt-2">
                            A new way to play the consecrated game of chess. A decentralized platform for everyone who wants to earn money playing the most beloved game in the history of mankind. Scholarships, tournaments, chip system, ratings, integrated rapido or blitz chess mode and much more in the future.A new way to play the consecrated game of chess. A decentralized platform for everyone who wants to earn money playing the most beloved game in the history of mankind. Scholarships, tournaments, chip system, ratings, integrated rapido or blitz chess mode and much more in the future.more in the future. aca
                        </p>
                    </div>
                    <div className="w-full max-w-[320px] flex flex-col gap-2">
                        <Link href="/login">
                            <LoadingButton label="LOGIN" className="w-full py-2 bg-black text-jText font-bold tracking-widest text-2xl uppercase border-2 border-black hover:bg-black/90 transition-colors" />
                        </Link>
                        <Link href="/signup">
                            <LoadingButton label="REGISTER" className="w-full py-2 bg-black text-jText font-bold tracking-widest text-2xl uppercase border-2 border-black hover:bg-black/90 transition-colors" />
                        </Link>
                    </div>
                    <div className="w-full max-w-[320px] flex flex-row gap-2 mt-2">
                        <Link href="#" className="flex-1">
                            <button className="w-full py-3 bg-black text-jText font-bold text-xsm tracking-widest uppercase border-2 border-black hover:bg-black/90 transition-colors">TERMINOS Y CONDIC</button>
                        </Link>
                        <Link href="#" className="flex-1">
                            <button className="w-full py-3 bg-black text-jText font-bold text-xsm tracking-widest uppercase border-2 border-black hover:bg-black/90 transition-colors">MANUAL DE USUARIO</button>
                        </Link>
                        <Link href="#" className="flex-1">
                            <button className="w-full py-3 bg-black text-jText font-bold text-xsm tracking-widest uppercase border-2 border-black hover:bg-black/90 transition-colors">F.A.Qs</button>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-[20px] right-[20px] w-[230px] h-[230px] bg-black flex items-center justify-center hidden-mobile"
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                >
                </div>
            </div>
        </div>
    )
}
