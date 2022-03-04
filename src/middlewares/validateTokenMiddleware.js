import connection from "../db.js";

export default async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    };

    const sessions = await connection.query('select * from sessoes where token = $1', [token]);
    if(!sessions) {
        return res.sendStatus(401);
    };

    const session = sessions.rows[0];
    const user = await connection.query('select * from usuarios where id=$1', [session.idUsuario]);
    if(user.rowCount === 0) {
        return res.sendStatus(401);
    };

    res.locals.user = user.rows[0];
    next();
};