import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type ProductProps = {
  id: number;
  name_product: string;
  price: number;
  image_url: string;
  quantity: number;
};

const Card = ({ id, name_product, price, image_url, quantity }: ProductProps) => {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <div className="bg-white rounded shadow-sm">
      <img src={image_url} alt={name_product} className="h-60  rounded-t" />
      <div className="p-3">
        <h2 className="title text-sm font-semibold">{name_product}</h2>
        <div className="flex items-center justify-between">
          <p className="text-green-600 text-xs font-bold">
            {formatCurrency(price)}
          </p>
          <button
            onClick={() => increaseCartQuantity(id)}
            className="py-1 px-4 rounded bg-red-50 text-red-400 hover:bg-white duration-300"
          >
            Add to cart
          </button>
        </div>
        <h4>{quantity} items on stock</h4>
      </div>
    </div>
  );
};

export default Card;
