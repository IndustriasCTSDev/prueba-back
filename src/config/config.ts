
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        db_name: process.env.DATABASE_NAME,
        db_user: process.env.DATABASE_USER,
        db_password: process.env.DATABASE_PASSWORD
    },
    passport: {
        jwt: {
            secret: process.env.SECRET_JWT
        }
    },
    otp: {
        secret: process.env.SECRET_OTP
    },
    smtp: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        encryption: process.env.MAIL_ENCRYPTION,
        from_address: process.env.MAIL_FROM_ADDRESS
    },
    aws: {
        s3: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            bucketName: process.env.AWS_BUCKET
        },
        region: process.env.AWS_DEFAULT_REGION
    }
})