import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserProvider";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegSadCry } from "react-icons/fa";
import { BiHappyHeartEyes } from "react-icons/bi";
import CartCard from "./CartCard";
import { formatCurrency } from "../utilities/formatCurrency";

type customers = {
  idcustomers: number;
  name: string;
  email: string;
};
type storeItem = {
  idproducts: number;
  quantity: number;
  image_url: string;
  name_product: string;
  price: number;
};

type CartItem = {
  id: number;
  quantity: number;
  image_url: string;
  name_product: string;
  price: number;
};

type ShoppingCartProps = {
  handleClickCart: () => void;
  cartItems: CartItem[];
};

const Cart = ({ handleClickCart, cartItems }: ShoppingCartProps) => {
  //storeItems fetched from the server( products table)
  const [storeItems, setStoreItems] = useState<storeItem[]>([]);
  const [customers, setCustomers] = useState<customers[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setStoreItems(res.data))
      .then(() =>
        axios
          .get("http://localhost:3000/customers")
          .then((result) => setCustomers(result.data))
      );
  });
  const { contextEmail } = useContext(UserContext);
  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.idproducts === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const idcustomer = customers.find(
    (e) => e.email === contextEmail
  )?.idcustomers;

  const handlePurchase = async () => {
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const getPrice = (itemId: number) => {
      return storeItems.find((e) => e.idproducts === itemId)?.price;
    };
    await axios.post("http://localhost:3000/order", {
      orderdate: currentDate,
      totalprice: total,
      id_customers: idcustomer,
    });
    
    let lastId = 0;

    await axios
      .get("http://localhost:3000/order/id")
      .then((res) => (lastId = Number(res.data)));

    cartItems.map(async (item) => {
      await axios.put("http://localhost:3000/products", {
        soldQuantity: item.quantity,
        productsid: item.id,
      });
      await axios.post("http://localhost:3000/order/items", {
        idproducts: item.id,
        order_id: lastId,
        quantity: item.quantity,
        price: getPrice(item.id),
      });
    });
    alert("order registred in the database , and products quantities updated accordingly");
    cartItems=[]
    console.log(cartItems)
  };

  return (
    <div className="fixed w-3/4 top-0 h-full left-0 bg-white shadow-2xl p-3 z-50">
      <button
        onClick={() => handleClickCart()}
        className="absolute top-3 right-3"
      >
        <AiOutlineCloseCircle />
      </button>
      <h1 className="text-center text-xl font-semibold italic mb-2 text-red-300">
        Cart
      </h1>
      <hr />
      {cartItems.length == 0 ? (
        <>
          <p className="text-center text-slate-500 mt-4 flex items-center justify-center">
            Your cart is empty <FaRegSadCry className="ml-2" />
          </p>
          <div>
            <button
              onClick={() => handleClickCart()}
              className="text-center mx-auto mt-4 flex items-center justify-center text-red-300 bg-red-50 px-4 py-1 rounded-lg hover:shadow-sm hover:bg-white duration-300"
            >
              Add some <BiHappyHeartEyes className="ml-2" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 grid">
            {cartItems.map((item) => (
              <CartCard {...item} key={item.id} />
            ))}
          </div>
          <strong className="float-left text-green-700">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(
                  (i) => i.idproducts === cartItem.id
                );
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </strong>
          <button
            className="py-1 float-right px-3 rounded bg-red-50 text-red-400 hover:shadow-sm hover:bg-white duration-300 font-semibold"
            onClick={handlePurchase}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
