var mysql = require("mysql2");
var mysqlConfig = require("./config.js");
var connection = mysql.createConnection(mysqlConfig);

const allCustomers='SELECT * FROM customers'
const getCategory= 'SELECT * FROM category'
const newCustomer='INSERT INTO  customers (name,email) VALUES (?,?)'
const getProducts='SELECT * FROM products'
const addProduct='INSERT INTO  products (name_product,price,quantity,image_url,idcategory) VALUES (?,?,?,?,?)'
const updateProduct= "UPDATE products SET quantity = ? WHERE name_product = ?"
const quantityAfterPurchase = "UPDATE products SET quantity =quantity - ? WHERE idproducts = ?"
const newOrder= 'INSERT INTO  orders (orderdate,totalprice,id_customers) VALUES (?,?,?)'
const newOrderItem ='INSERT INTO  orderitems (idproducts,order_id,quantity,price) VALUES (?,?,?,?)'
const getCustomerId= 'SELECT idcustomers FROM customers WHERE email=?'
const getLastOrderId='SELECT id_orders FROM orders ORDER BY id_orders DESC LIMIT 1'


connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to " + mysqlConfig.database);
  }
});


module.exports.connection=connection
module.exports.allCustomers=allCustomers
module.exports.newCustomer=newCustomer
module.exports.getProducts=getProducts
module.exports.getCategory=getCategory
module.exports.addProduct=addProduct
module.exports.updateProduct=updateProduct
module.exports.quantityAfterPurchase=quantityAfterPurchase
module.exports.newOrder=newOrder
module.exports.newOrderItem=newOrderItem
module.exports.getCustomerId=getCustomerId
module.exports.getLastOrderId=getLastOrderId