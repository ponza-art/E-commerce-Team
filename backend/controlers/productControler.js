const products = require("../modules/modulesProduct")

const getAllProducts = async (req,res)=>{
    const product = await products.find()
    res.send(product);
}

const getProductById =async (req, res) => {
try{
const product = await products.findById(req.params.productId)
   if(!product){
     return res.status(404).send('Product not found');
   }
res.send(product)
}catch(err){
   return res.status(400).send('invalid product Id');
 
}
}


module.exports={
    getAllProducts,
    getProductById,
    
}