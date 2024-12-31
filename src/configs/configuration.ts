export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    salt: parseInt(process.env.SALT),
    accessToken: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
        accessTokenScrect: process.env.ACCESS_TOKEN_SCRECT,
    },
    refreshToken: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
        accessTokenScrect: process.env.REFRESH_TOKEN_SCRECT,
    },
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});
