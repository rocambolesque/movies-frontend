const axios = require('axios');


class AuthService {
    uri = 'https://rocambolesque-movies-auth.herokuapp.com';

	login(email, password) {
        return axios.post(this.uri + '/login', {
            username: email,
            password: password
        })
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

    setUserInfo(info) {
        debugger;
        localStorage.setItem('token', info.token);
        localStorage.setItem('userId', info.id);
    }

    getAuthHeaders(token) {
        return {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
}

export default AuthService;
