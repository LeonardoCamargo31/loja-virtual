import * as LoginConstants from '../actions/LoginActions'

const userKey = 'token'//qualquer nome

const initialState = {
    userToken: JSON.parse(localStorage.getItem(userKey)),
    error: null
};

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        //autenticação
        case LoginConstants.AUTH_SUCCESS: {
            return { ...state, userToken: action.payload };
        }
        case LoginConstants.AUTH_FAILURE: {
            return { ...state, error: action.payload }
        }

        //logout
        case LoginConstants.REMOVE_TOKEN:
            localStorage.removeItem(userKey)
            return { ...state, userToken: null, error: null }

        default: return state
    }
}

export default TodoReducer