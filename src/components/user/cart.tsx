import useCartStore from "@/providers/cart-provider";
import { ArchiveX } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import PayButton from "./pay-button";
import { Input } from "../ui/input";
import { useState } from "react";

const Cart = () => {
  const { cart, calculateTotalPrice } = useCartStore((state) => state);
  const [tableNumber, setTableNumber] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="pb-4 border-b-2 border-custom-dark-blue flex items-center justify-between">
        <h2 className="text-lg text-custom-blue">Cart</h2>
        {cart.size === 0 && (
          <Button onClick={() => navigate("/home/menu")}>Add items</Button>
        )}
      </div>

      {cart.size === 0 && (
        <div className="flex-1 flex items-center justify-center text-lg text-custom-blue">
          <span className="flex items-center gap-1">
            Cart is empty
            <ArchiveX className="h-6 w-6 text-custom-blue/80" />
          </span>
        </div>
      )}

      {cart.size > 0 && (
        <div className="py-4 flex-1 flex flex-col">
          <div className="w-full flex flex-col">
            <div className="bg-custom-dark-blue p-2 text-custom-black flex items-center justify-between font-bold">
              <span>Item Name</span>
              <span>Quantity</span>
            </div>
            {Array.from(cart.values()).map((value) => (
              <div
                className="bg-custom-blue px-2 py-4 text-custom-black flex items-center justify-between font-bold"
                key={value.item._id}
              >
                <div className="flex flex-col">
                  <span>{value.item.name}</span>
                  <span className="text-custom-black font-normal text-sm text-end">
                    ({value.item.description})
                  </span>
                </div>
                <span>{value.quantity}</span>
              </div>
            ))}
            <div className="bg-custom-blue p-2 border-t border-t-custom-black text-custom-black flex items-center justify-between font-bold">
              <span>Total:</span>
              <span>Rs. {calculateTotalPrice()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-1/4 mx-auto mt-10">
            <Input
              type="number"
              placeholder="Enter table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(parseInt(e.target.value))}
            />
            <PayButton
              amount={calculateTotalPrice()}
              tableNumber={tableNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
