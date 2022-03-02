import connection from '../db.js'
import bcrypt from 'bcrypt';

export async function signUp(req, res) {
    const user = req.body;
    const senhaHash = bcrypt.hashSync(user.senha, 10);

    try {
        
        await connection.query('insert into usuarios (nome, email, senha) value ($1)', [{ ...user, senha: senhaHash }]);

        res.sendStatus(201);

    } catch (error) {
        res.send(error).status(500);
    };
};