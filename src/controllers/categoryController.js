import connection from '../db.js'

export async function createCategory(req, res) {
    const user = res.locals.user;
    const { nome } = req.body;
    if(!user){
        res.sendStatus(401);
        return;
    };

    try {
        
        await connection.query(`insert into categorias (nome) values ($1)`, [nome]);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function getCategory(req, res) {
    const user = res.locals.user;
    if(!user){
        res.sendStatus(401);
        return;
    };

    try {
        
        const categories = await connection.query(`select * from categorias`);

        res.send(categories.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function updateCategory(req, res) {
    const user = res.locals.user;
    const category = req.params.id;
    const categoryDetails = req.body;

    if(!user || !category || !categoryDetails){
        res.sendStatus(401);
        return;
    };

    try {
        
        await connection.query(`update categorias set nome = $1 where id = $2`, [categoryDetails.nome, category]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function deleteCategory(req, res) {
    const user = res.locals.user;
    const category = req.params.id;

    if(!user || !category){
        res.sendStatus(401);
        return;
    };

    try {
        
        await connection.query(`delete from categorias where id = $1`, [category]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};