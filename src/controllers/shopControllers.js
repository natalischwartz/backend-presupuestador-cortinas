import Product from '../models/product.model.js'

 export const getProducts = async (req,res) => {
        try {
          // Consulta a la base de datos para ambas categorías en una sola consulta
        const products = await Product.find({
            "category": { $in: ["cortineria", "tapiceria"] }
        });
         // Convertir `price` de cadena a número
        products.forEach(product => {
        product.price =Number(product.price.replace(/[^0-9.-]+/g,"")) ;
        });
        res.json(products);


        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }

}
