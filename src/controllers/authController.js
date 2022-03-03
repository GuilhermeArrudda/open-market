import connection from '../db.js'
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'

export async function signUp(req, res) {
    const user = req.body;
    const senhaHash = bcrypt.hashSync(user.senha, 10);

    try {
        
        await connection.query('insert into usuarios (nome, email, senha) values ($1, $2, $3)', [user.nome, user.email, senhaHash]);

        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    };
};

export async function signIn(req, res) {
    const { email, senha } = req.body;

    try {
        const result = await connection.query(`select * from usuarios where email = $1`, [email]);
        if(result.rowCount === 0) {
            return res.sendStatus(401);
        };

        const user = result.rows[0]
        if(!bcrypt.compareSync(senha, user.senha)){
            return res.sendStatus(401);
        };

        const token = uuid();

        await connection.query(`insert into sessoes ("idUsuario", token) values ($1, $2)`, [user.id, token])

        res.send({token}).status(200);
    
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}