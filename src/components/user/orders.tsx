import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Dot, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type MenuItem = {
  category: string;
  description: string;
  name: string;
  price: string;
  restaurantId: string;
  _id: string;
};

type Order = {
  items: MenuItem[];
  restaurantId: string;
  status: "Pending" | "Approved" | "Cancelled" | "Served";
  userId: string;
  createdAt: Date;
  _id: string;
};

const statusColors = {
  Pending: "text-yellow-200",
  Approved: "text-emerald-300",
  Cancelled: "text-rose-700",
  Served: "text-cyan-200",
};

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const user: { userId: string } = jwtDecode(localStorage.getItem("token")!);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/payment/v1/user/orders`;

      const data = {
        userId: user.userId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(url, data, config);

      setOrders(response.data.data);
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const parseDate = (date: Date) => {
    const newDate = new Date(date);

    return `${newDate.getDay()}-${newDate.getMonth()}-${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  };

  return (
    <div className="p-4 flex-1 flex flex-col">
      <div className="pb-4 border-b-2 border-custom-dark-blue flex items-center justify-between">
        <h2 className="text-lg text-custom-blue">Orders</h2>
        <Button size="sm" onClick={fetchOrders}>
          Refresh
        </Button>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-custom-blue" />
        </div>
      )}

      {orders.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
          {orders.map((order) => (
            <div
              className="p-2 bg-custom-dark-blue rounded-md flex flex-col space-y-1"
              key={order._id}
            >
              <h2 className="font-bold text-custom-black">
                Order ID:- {order._id}
              </h2>
              <p className="text-sm text-custom-blue font-semibold">
                Placed on {parseDate(order.createdAt)}
              </p>
              <div className="bg-custom-blue p-2 rounded-md shadow-sm text-custom-black flex flex-col space-y-1">
                <span className="font-bold">Order summary:</span>
                {order.items.map((item) => (
                  <div
                    className="flex items-center justify-between"
                    key={item._id}
                  >
                    <span className="text-custom-dark-blue font-bold">
                      {item.name}
                    </span>
                    <span className="font-semibold">
                      Rs. {item.price} per unit
                    </span>
                  </div>
                ))}
              </div>
              <div className="font-bold flex items-center justify-end">
                <p className={`${statusColors[order.status]}`}>
                  Status: {order.status}
                </p>
                <Dot className={`${statusColors[order.status]} h-10 w-10`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
