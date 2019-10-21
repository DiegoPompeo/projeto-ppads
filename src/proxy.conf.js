const PROXY_CONFIG = [
    {
        context: [
            "/signup",
            "/login",
            "/profile",
            "/register",
            "/register-success",
            "/update",
            "/details",
            "/cientists",
            "/premium",
            "/email"
        ],
        target: "https://server-redesocial.herokuapp.com/redesocial",
        secure: false
    }
]

module.exports = PROXY_CONFIG;