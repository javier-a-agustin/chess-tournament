"use client"

import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/auth/login'

const schema = yup.object().shape({
    username: yup.string().trim().required('El usuario es obligatorio'),
    password: yup.string().trim().required('La contraseña es obligatoria'),
})

const LoginForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await schema.validate({ username, password }, { abortEarly: false })
            setErrors({})

            const data = await loginUser(username, password)

            if (data.token) {
                document.cookie = `token=${data.token}; path=/`
                router.push('/tournament')
            }

        } catch (err) {
            if (err.inner) {
                const formErrors = {}
                err.inner.forEach((validationError) => {
                    formErrors[validationError.path] = validationError.message
                })
                setErrors(formErrors)
            } else {
                setErrors({ 
                    api: err.message || 'Error en el inicio de sesión. Por favor, intente nuevamente.'
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {errors.api && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {errors.api}
                </div>
            )}
            <label className="text-black font-medium text-base tracking-widest">USUARIO</label>
            <input 
                type="text" 
                className="w-full bg-black text-[#f0e68c] rounded px-3 py-2 font-semibold tracking-widest text-base focus:outline-none" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isLoading}
            />
            {errors.username && <span className="text-red-600 text-xs font-bold">{errors.username}</span>}
            <label className="text-black font-medium text-base tracking-widest mt-2">CONTRASEÑA</label>
            <input 
                type="password" 
                className="w-full bg-black text-[#f0e68c] rounded px-3 py-2 font-semibold tracking-widest text-base focus:outline-none pr-10" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
            />
            {errors.password && <span className="text-red-600 text-xs font-bold">{errors.password}</span>}
            <div className="flex gap-2 mt-6">
                <button 
                    type="submit" 
                    className={`flex-1 py-2 bg-[#4d4936] text-[#f0e68c] font-bold tracking-widest text-md rounded transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5d5946]'}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'CARGANDO...' : 'SUBMIT'}
                </button>
                <button 
                    type="button" 
                    className="flex-1 py-2 bg-[#e74c3c] text-white font-bold tracking-widest text-sm rounded transition-colors hover:bg-[#c0392b]"
                    disabled={isLoading}
                >
                    TÉRMINOS Y CONDIC
                </button>
            </div>
        </form>
    )
}

export default LoginForm