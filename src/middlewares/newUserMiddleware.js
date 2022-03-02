import connection from "../db.js";
import { singUpSchema } from "../schemas/authSchema.js";

export async function validateNewUser (req, res, next) {
    const user = req.body;

    const validation = singUpSchema.validate(user)

    if(validation.error) {
        return res.sendStatus(422)
    }

    try {

        const email = req.body.email.substring(0, 150)
        console.log(email)

        const emailDuplicated = await connection.query(`select * from usuarios where email = ${email}`)

        console.log(emailDuplicated)

        if(emailDuplicated.rowCount !== 0) {
            return res.send('Email já está em uso').status(409);
        };

        next();
    } catch (error) {
        res.send(error).status(500);
    };
};