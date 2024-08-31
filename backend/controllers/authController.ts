import bcrypt from "bcryptjs"


export const signUp = async (req: any, res: any) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)





    } catch (error: any) {
        console.error("Error signup controller", error.message)
        res.status(500).json({ error: "internal Server Error" });
    }

}

export const login = async (req: any, res: any) => {
    try {
        const { username, password } = req.body


    } catch (error: any) {
        console.error("Error login controller", error.message)
        res.status(500).json({ error: "internal Server Error" });
    }


}

export const logout = async (req: any, res: any) => {
    try {
        


    } catch (error: any) {
        console.error("Error logout controller", error.message)
        res.status(500).json({ error: "internal Server Error" });
    }


}