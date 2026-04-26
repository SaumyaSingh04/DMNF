import { IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import logo from "../../../public/logo.svg";
import useCartStore from "@/providers/cart-provider";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type RestaurantData = {
  description: string;
  location: string;
  name: string;
};

const PayButton = ({
  amount,
  tableNumber,
}: {
  amount: number;
  tableNumber: number;
}) => {
  const { toast } = useToast();
  const { clearCart, cart } = useCartStore((state) => state);
  const [restaurant, setRestaurant] = useState<RestaurantData>();

  const restaurantId = localStorage.getItem("restaurantId");

  const items = Array.from(cart.values()).map((menuItem) => menuItem.item._id);

  console.log("TABLE NUMBER--", tableNumber);

  useEffect(() => {
    if (restaurantId) {
      const fetchRestaurant = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/restaurant/v1/info`;

          const data = {
            restaurantId,
          };

          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };

          const response = await axios.post(url, data, config);

          setRestaurant(response.data.data);
        } catch (error) {
          toast({
            title: "Error fetching restaurant details",
            variant: "destructive",
          });
        }
      };

      fetchRestaurant();
    }
  }, [restaurantId]);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    if (!tableNumber || tableNumber === 0) {
      return toast({
        title: "Enter a table number",
        variant: "destructive",
      });
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast({
        title: "Razorpay SDK failed to load",
        description: "Network connection error",
        variant: "destructive",
      });
      return;
    }

    const url = `${import.meta.env.VITE_BACKEND_URL}/payment/v1/create`;

    const data = {
      amount,
    };

    const result = await axios.post(url, data);

    if (!result) {
      toast({
        title: "Server error",
        description: "Network connection error",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: "rzp_test_wM0jnjwi022CX7",
      amount: amount.toString(),
      currency: result.data.data.currency,
      name: restaurant?.name,
      description: restaurant?.description,
      order_id: result.data.data.id,
      image: { logo },
      handler: async function (response: any) {
        const user: { userId: string } = jwtDecode(
          localStorage.getItem("token")!
        );

        const data = {
          orderCreationId: result.data.data.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          restaurantId,
          userId: user.userId,
          items,
          tableNumber,
        };

        const url = `${import.meta.env.VITE_BACKEND_URL}/payment/v1/success`;

        const success = await axios.post(url, data);

        console.log(success);
        toast({
          title: "Order placed",
        });

        clearCart();
      },
      prefill: {
        name: restaurant?.name,
      },
      notes: {
        address: restaurant?.location,
      },
      theme: {
        color: "#272727",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <Button className="mx-auto" onClick={displayRazorpay}>
      <IndianRupee className="h-4 w-4 mr-2" />
      Pay Now
    </Button>
  );
};

export default PayButton;
