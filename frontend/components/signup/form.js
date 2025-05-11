'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerUser } from '@/lib/auth/register'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

// Define validation schema
const validationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required('This field is required.'),
    last_name: Yup.string().trim().required('This field is required.'),
    username: Yup.string().trim().required('This field is required.'),
    email: Yup.string().email('Invalid email').trim().required('This field is required.'),
    password: Yup.string().trim()
        .min(8, 'This password is too short. It must contain at least 8 characters.')
        .matches(/^(?=.*[a-zA-Z])/, 'This password is too common.')
        .matches(/^(?=.*[0-9])/, 'This password is entirely numeric.')
        .required('This field is required.'),
    password2: Yup.string().trim()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('This field is required.')
})

export default function SignUpForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            // Validate form data
            await validationSchema.validate(formData, { abortEarly: false })
            
            await registerUser(formData)
            router.push('/login')
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // Format Yup validation errors
                const formattedErrors = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message
                    return acc
                }, {})
                setError(JSON.stringify(formattedErrors))
            } else {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {error && (
                <div className="bg-red-500 text-white p-2 rounded">
                    {error}
                </div>
            )}
            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    name="first_name"
                    placeholder="NOMBRE"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#333333] text-white placeholder-white border-none rounded"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    name="last_name"
                    placeholder="APELLIDO"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#333333] text-white placeholder-white border-none rounded"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <input
                    type="text"
                    name="username"
                    placeholder="NOMBRE DE USUARIO"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#333333] text-white placeholder-white border-none rounded"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <input
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#333333] text-white placeholder-white border-none rounded"
                    required
                />
            </div>

            <div className="flex flex-col gap-1 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="CONTRASEÑA"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#333333] text-white placeholder-white border-none rounded"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
                >
                    👁️
                </button>
            </div>

            <div className="flex flex-col gap-1 relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    placeholder="REPETIR CONTRASEÑA"
                    value={formData.password2}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#333333] text-white placeholder-white border-none rounded"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
                >
                    👁️
                </button>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 bg-[#333333] text-white py-2 px-4 rounded hover:bg-[#444444] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'REGISTRANDO...' : 'REGISTRAR'}
                </button>
                <Link
                    href="#"
                    className="flex-1 bg-jTextRed text-white py-2 px-4 rounded text-xs text-center content-center hover:bg-jTextRedHover transition-colors"
                >
                    TÉRMINOS Y CONDIC.
                </Link>
            </div>
        </form>
    )
} 