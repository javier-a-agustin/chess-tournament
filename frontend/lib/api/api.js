const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const getAuthToken = () => {
    try {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1].trim() : null;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

const removeAuthToken = () => {
    // Remove token cookie by setting an expired date
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const getTournaments = async (status = null) => {
    try {
        const token = getAuthToken();
        if (!token) {
            return {
                data: null,
                success: false,
                errorMessage: 'No authentication token found'
            };
        }

        let url = `${API_URL}/tournaments/tournaments/`;
        if (status) {
            url += `?status=${status}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401) {
            removeAuthToken();
            window.location.href = '/login';
            return {
                data: null,
                success: false,
                errorMessage: 'Session expired. Please login again.'
            };
        }

        if (!response.ok) {
            return {
                data: null,
                success: false,
                errorMessage: 'Failed to fetch tournaments'
            };
        }

        const data = await response.json();
        return {
            data,
            success: true,
            errorMessage: null
        };
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        return {
            data: null,
            success: false,
            errorMessage: error.message || 'An unexpected error occurred'
        };
    }
};

export const createTournament = async (tournamentData) => {
    try {
        const token = getAuthToken();
        if (!token) {
            return {
                data: null,
                success: false,
                errorMessage: 'No authentication token found'
            };
        }

        const response = await fetch(`${API_URL}/tournaments/tournaments/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: tournamentData.name,
                start_date: `${tournamentData.date}T${tournamentData.time}:00Z`,
                mode: tournamentData.mode,
                prize: tournamentData.prize,
                description: tournamentData.description,
                max_players: tournamentData.players
            })
        });

        if (response.status === 401) {
            removeAuthToken();
            window.location.href = '/login';
            return {
                data: null,
                success: false,
                errorMessage: 'Session expired. Please login again.'
            };
        }

        if (!response.ok) {
            const errorData = await response.json();
            return {
                data: null,
                success: false,
                errorMessage: errorData.detail || 'Failed to create tournament'
            };
        }

        const data = await response.json();
        return {
            data,
            success: true,
            errorMessage: null
        };
    } catch (error) {
        console.error('Error creating tournament:', error);
        return {
            data: null,
            success: false,
            errorMessage: error.message || 'An unexpected error occurred'
        };
    }
};

export const getTournamentDetail = async (code) => {
    try {
        const token = getAuthToken();
        if (!token) {
            return {
                data: null,
                success: false,
                errorMessage: 'No authentication token found'
            };
        }

        const response = await fetch(`${API_URL}/tournaments/tournaments/${code}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401) {
            removeAuthToken();
            window.location.href = '/login';
            return {
                data: null,
                success: false,
                errorMessage: 'Session expired. Please login again.'
            };
        }

        if (!response.ok) {
            return {
                data: null,
                success: false,
                errorMessage: 'Failed to fetch tournament detail'
            };
        }

        const data = await response.json();
        return {
            data,
            success: true,
            errorMessage: null
        };
    } catch (error) {
        console.error('Error fetching tournament detail:', error);
        return {
            data: null,
            success: false,
            errorMessage: error.message || 'An unexpected error occurred'
        };
    }
};

export const registerInTournament = async (code) => {
    try {
        const token = getAuthToken();
        if (!token) {
            return {
                data: null,
                success: false,
                errorMessage: 'No authentication token found'
            };
        }

        const response = await fetch(`${API_URL}/tournaments/tournaments/${code}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401) {
            removeAuthToken();
            window.location.href = '/login';
            return {
                data: null,
                success: false,
                errorMessage: 'Session expired. Please login again.'
            };
        }

        if (!response.ok) {
            const errorData = await response.json();
            return {
                data: null,
                success: false,
                errorMessage: errorData.error || 'Failed to register in tournament'
            };
        }

        const data = await response.json();
        return {
            data,
            success: true,
            errorMessage: null
        };
    } catch (error) {
        console.error('Error registering in tournament:', error);
        return {
            data: null,
            success: false,
            errorMessage: error.message || 'An unexpected error occurred'
        };
    }
}; 