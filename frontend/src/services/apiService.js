import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';
export function login(username, password) {
    return fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid login credentials');
                } else {
                    throw new Error('Login failed with status: ' + response.status);
                }
            }
            console.log("login success")
            return response.json();

        });
}

export function logout() {
    return fetch(`${API_URL}/logout/`, {
        method: 'POST',
        credentials: 'include', // Include for session management
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.ok;
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
}

export function register(username, password, confirmPassword) {
    return fetch(`${API_URL}/api/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password1: password, password2: confirmPassword }),
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.json().then(errorData => {
                        throw new Error(`Invalid registration data: ${JSON.stringify(errorData)}`);
                    });
                } else {
                    throw new Error('Registration failed with status: ' + response.status);
                }
            }
            console.log("registration success");
            return response.json();
        })
        .then(data => {
            console.log('Registration response:', data);
            return data;
        })
        .catch(error => {
            console.error('Registration error:', error);
        });
}


export function getMyVocabList() {
    return fetch(`${API_URL}/api/my_vocab_list/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        credentials: 'include',
    });
}