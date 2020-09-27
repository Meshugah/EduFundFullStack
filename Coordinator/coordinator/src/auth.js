class Auth {
    constructor() {
        this.authenticated = false
        this.jwt = null
    }

    login(jwt) {
        this.authenticated = true
        localStorage.jwt = jwt
    }

    logout() {
        this.authenticated = false
    }

    isAuthenticated() {
        return this.authenticated
    }


}


export default new Auth()
