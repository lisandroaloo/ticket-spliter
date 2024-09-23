import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (email: string, res: any) => {
    // Generar el token
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "15d",
    });

    // Establecer la cookie
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        httpOnly:true, // prevents XSS attacks
        sameSite: "strict",//  prevents CSRF attacks
    });
};

export default generateTokenAndSetCookie;
