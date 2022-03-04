import connection from "../db.js";

export async function postProducts(req, res) {
    const user = res.locals.user;
    const product = req.body;
    if(!user){
        res.sendStatus(401);
        return;
    };

    try {
        
        await connection.query(`insert into produtos (nome, preco, "idUsuario") values ($1, $2, $3)`, [product.nome, product.preco, user.id]);

        res.sendStatus(201)

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
}

export async function getProducts(req, res) {
    const user = res.locals.user;
    if(!user){
        res.sendStatus(401);
        return;
    };

    try {
        
        const products = await connection.query(`select * from produtos where "idUsuario" = $1`, [user.id]);

        res.send(products.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function updateProducts(req, res) {
    const user = res.locals.user;
    const product = req.params.id;
    const productDetails = req.body;
    if(!user || !product || !productDetails) {
        res.sendStatus(401);
        return;
    };

    try {
        
        await connection.query(`update produtos set nome = $1, preco = $2 where id = $3 and "idUsuario" = $4`, [productDetails.nome, productDetails.preco, product, user.id]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function deleteProducts(req, res) {
    const user = res.locals.user;
    const product = req.params.id;
    if(!user || !product){
        res.sendStatus(401);
        return;
    };

    try {
        
        await connection.query(`delete from produtos where id = $1 and "idUsuario" = $2`, [product, user.id]);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};