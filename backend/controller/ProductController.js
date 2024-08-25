// Example of a simple getProducts function
exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Similarly, define and export addProduct and deleteProduct
  exports.addProduct = async (req, res) => {
    // logic for adding product
  };
  
  exports.deleteProduct = async (req, res) => {
    // logic for deleting product
  };
  