export const loginUser = async (username, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión')
    }

    return data
}
