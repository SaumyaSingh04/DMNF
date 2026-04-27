import { IndianRupee, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import useCartStore from "@/providers/cart-provider";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

declare global {
  interface Window { Razorpay: any; }
}

const PayButton = ({
  amount,
  tableNumber,
  paymentMode,
}: {
  amount: number;
  tableNumber: number;
  paymentMode: "online" | "cod";
}) => {
  const { toast } = useToast();
  const { clearCart, cart } = useCartStore((state) => state);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handlePay = async () => {
    if (!tableNumber || tableNumber === 0) {
      return toast({ title: "Enter a table number", variant: "destructive" });
    }

    const restaurantId = localStorage.getItem("restaurantId");
    const user: { userId: string } = jwtDecode(localStorage.getItem("token")!);
    const items = Array.from(cart.values()).map((v) => v.item._id);
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

    setLoading(true);
    try {
      if (paymentMode === "cod") {
        await axios.post(`${baseUrl}/payment/v1/cod`, { restaurantId, userId: user.userId, items, tableNumber }, config);
        toast({ title: "Order placed successfully!" });
        clearCart();
      } else {
        // Step 1: create Razorpay order
        const { data } = await axios.post(`${baseUrl}/payment/v1/create`, { amount }, config);
        const order = data.data;

        // Step 2: open Razorpay checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          handler: async (response: any) => {
            await axios.post(`${baseUrl}/payment/v1/success`, {
              orderCreationId: order.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              restaurantId,
              userId: user.userId,
              items,
              tableNumber,
            }, config);
            toast({ title: "Payment successful!" });
            clearCart();
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch {
      toast({ title: "Failed to place order", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button className="mx-auto" onClick={handlePay} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <IndianRupee className="h-4 w-4 mr-2" />
      )}
      Pay Now
    </Button>
  );
};

export default PayButton;
