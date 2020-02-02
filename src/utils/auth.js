import jwt_decode from 'jwt-decode';
import moment from 'moment';

export function checkToken() {
    let token = sessionStorage.getItem('token_');
    if (token) {
        try {
            let decoded = jwt_decode(token);
            console.log('decoded', decoded);
            let expiryDateTime = moment.unix(decoded.exp)
            console.log('expiryDateTime', expiryDateTime);
            if (expiryDateTime._d >= new Date()) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('e', e.message);
            return false;
        }
    }
    else {
        return false;
    }
}