import jwt from "jsonwebtoken";

const SECRET_KEY = "abciop123098";

export const generateToken = (data: any, expiresIn = "24h") => {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn });

    return token;
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
