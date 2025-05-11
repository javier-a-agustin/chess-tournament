import LoadingLink from "@/components/core/loadingLink";
import LoginForm from "@/components/login/form";
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black p-4">
            <div className="relative w-full max-w-[420px] h-auto min-h-[500px] bg-jBeige rounded-lg shadow-lg p-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mt-2 mb-8">
                    <span className="inline-block w-6 h-6 bg-black rounded mr-2"></span>
                    <span className="text-xl font-bold tracking-widest text-black">LOGO EMPRESA</span>
                </div>
                <LoginForm />
                <div className="w-full flex flex-col items-center mt-8 gap-2 text-sm">
                    <div className="flex gap-2 items-center">
                        <span className="text-black font-semibold">NO TENÉS CUENTA?</span>
                        <LoadingLink label="REGISTRATE" className="text-jTextRed font-semibold hover:underline" href="/signup" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-black font-semibold">OLVIDASTE TU CONTRASEÑA?</span>
                        <Link href="#" className="text-jTextRed font-semibold hover:underline">RESETEALA</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
