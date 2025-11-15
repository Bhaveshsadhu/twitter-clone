import bcrypt from "bcryptjs";

export const hashPassword = async (hashPassword, saltRound = 10) => {
    return await bcrypt.hash(hashPassword, saltRound);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateRandomCode = (length = 6) => {
    let code = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}