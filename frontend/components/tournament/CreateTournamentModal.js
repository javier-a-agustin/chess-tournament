'use client'

import React, { useState } from 'react'
import { createTournament } from '@/lib/api/api'
import * as Yup from 'yup'

const tournamentSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre del torneo es requerido')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(200, 'El nombre no puede exceder los 200 caracteres'),
    mode: Yup.string()
        .required('El modo de juego es requerido')
        .oneOf(['classical', 'rapid', 'blitz', 'bullet', 'hyperbullet'], 'Modo de juego inválido'),
    description: Yup.string()
        .required('La descripción es requerida')
        .min(10, 'La descripción debe tener al menos 10 caracteres'),
    date: Yup.string()
        .required('La fecha es requerida')
        .test('future-date', 'La fecha debe ser futura', value => {
            if (!value) return false;
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }),
    time: Yup.string()
        .required('La hora es requerida'),
    players: Yup.number()
        .required('El número de jugadores es requerido')
        .min(2, 'Mínimo 2 jugadores')
        .max(128, 'Máximo 128 jugadores')
        .integer('Debe ser un número entero'),
    prize: Yup.number()
        .required('El premio es requerido')
        .min(100, 'El premio mínimo es 100 PTS')
        .max(1000000, 'El premio máximo es 1.000.000 PTS')
});

const CreateTournamentModal = ({ isOpen, onClose, handleGetTournaments }) => {
    const [formData, setFormData] = useState({
        name: '',
        mode: '',
        description: '',
        date: '',
        time: '',
        players: 16,
        prize: 1000
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field-specific error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            setError(null);
            setErrors({});
            setLoading(true);

            await tournamentSchema.validate(formData, { abortEarly: false });

            const response = await createTournament(formData);
            
            if (response.success) {
                handleGetTournaments()
                onClose();
            } else {
                setError(response.errorMessage);
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors = {};
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#f0e68c] rounded-lg w-full max-w-2xl">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">CREAR TORNEO</h2>
                    
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* Tournament Name */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="NOMBRE TORNEO"
                                className={`w-full bg-[#333] text-[#f0e68c] p-3 rounded ${errors.name ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>

                        {/* Mode Dropdown and Start Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                    className={`w-full bg-[#333] text-[#f0e68c] p-3 rounded ${errors.mode ? 'border-2 border-red-500' : ''}`}
                                >
                                    <option value="">MODO</option>
                                    <option value="classical">Clásico (&gt;60 min)</option>
                                    <option value="rapid">Rápido (10-60 min)</option>
                                    <option value="blitz">Blitz (3-10 min)</option>
                                    <option value="bullet">Bala (&lt;3 min)</option>
                                    <option value="hyperbullet">Ultrabala (30 seg)</option>
                                </select>
                                {errors.mode && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.mode}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="DESCRIPCIÓN"
                                className={`w-full bg-[#333] text-[#f0e68c] p-3 rounded h-32 ${errors.description ? 'border-2 border-red-500' : ''}`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
                            )}
                        </div>

                        {/* Tournament Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#f0e68c] p-2 rounded">
                                <label className="block text-black font-bold">FECHA INICIO</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={`w-full bg-[#333] text-[#f0e68c] p-2 rounded ${errors.date ? 'border-2 border-red-500' : ''}`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.date}</p>
                                )}
                            </div>
                            <div className="bg-[#f0e68c] p-2 rounded">
                                <label className="block text-black font-bold">HORA INICIO</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className={`w-full bg-[#333] text-[#f0e68c] p-2 rounded ${errors.time ? 'border-2 border-red-500' : ''}`}
                                />
                                {errors.time && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.time}</p>
                                )}
                            </div>
                            <div className="bg-[#f0e68c] p-2 rounded">
                                <label className="block text-black font-bold">JUGADORES</label>
                                <input
                                    type="number"
                                    name="players"
                                    value={formData.players}
                                    onChange={handleChange}
                                    className={`w-full bg-[#333] text-[#f0e68c] p-2 rounded ${errors.players ? 'border-2 border-red-500' : ''}`}
                                />
                                {errors.players && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.players}</p>
                                )}
                            </div>
                            <div className="bg-[#f0e68c] p-2 rounded">
                                <label className="block text-black font-bold">PREMIO</label>
                                <input
                                    type="number"
                                    name="prize"
                                    value={formData.prize}
                                    onChange={handleChange}
                                    placeholder="5.000 PTS"
                                    className={`w-full bg-[#333] text-[#f0e68c] p-2 rounded ${errors.prize ? 'border-2 border-red-500' : ''}`}
                                />
                                {errors.prize && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.prize}</p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="px-6 py-2 bg-[#333] text-[#f0e68c] rounded font-bold disabled:opacity-50"
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-2 bg-[#e91e63] text-white rounded font-bold disabled:opacity-50"
                            >
                                {loading ? 'CREANDO...' : 'CREAR'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTournamentModal 