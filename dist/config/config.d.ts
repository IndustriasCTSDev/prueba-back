declare const _default: () => {
    port: number;
    database: {
        host: string;
        db_name: string;
        db_user: string;
        db_password: string;
    };
    passport: {
        jwt: {
            secret: string;
        };
    };
    otp: {
        secret: string;
    };
    smtp: {
        host: string;
        port: string;
        user: string;
        pass: string;
        encryption: string;
        from_address: string;
    };
    aws: {
        s3: {
            accessKeyId: string;
            secretAccessKey: string;
            bucketName: string;
        };
        region: string;
    };
};
export default _default;
