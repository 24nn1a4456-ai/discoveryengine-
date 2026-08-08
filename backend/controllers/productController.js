// Get all products
const getProducts = (req, res) => {
    res.send("Get Products Controller Working");
};

// Add a product
const addProduct = (req, res) => {
    res.send("Add Product Controller Working");
};

// Update a product
const updateProduct = (req, res) => {
    res.send("Update Product Controller Working");
};

// Delete a product
const deleteProduct = (req, res) => {
    res.send("Delete Product Controller Working");
};

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
  