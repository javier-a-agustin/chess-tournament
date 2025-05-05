export async function registerUser(userData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar usuario');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
