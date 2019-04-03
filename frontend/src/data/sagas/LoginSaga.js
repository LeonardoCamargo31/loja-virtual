import * as LoginActions from '../actions/LoginActions'
import { ApiService } from '../services/ApiService'
import { all, put, takeEvery} from 'redux-saga/effects'

const endpoint = 'sessions';

function* authorize({ payload }) {
    const response = yield ApiService.post(endpoint, payload)
    if(response.success===true){
        const data = response.details
        yield put({ type: LoginActions.AUTH_SUCCESS, payload: data });
        localStorage.setItem('token', JSON.stringify(data));
    }else{
        yield put({ type: LoginActions.AUTH_FAILURE, payload: response.message });
        localStorage.removeItem('token');
    }
}
function* watchAuthorize() {
    //e passamos a action que queremos observar e função que desejamos executar
    yield takeEvery(LoginActions.AUTH_REQUEST, authorize)
}

export default function* LoginSaga() {
    yield all([
        watchAuthorize()
    ])
}