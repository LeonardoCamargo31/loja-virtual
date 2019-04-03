export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const authorize = (email, password) => ({
    type: AUTH_REQUEST,
    payload: { email, password }
});

export const removeToken = () => {
    return {
        type: REMOVE_TOKEN
    }
}