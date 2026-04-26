import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Dot, Loader2 } from "lucide-react";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select";
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
  tableNumber: number;
};

const statusColors = {
  Pending: "yellow-200",
  Approved: "emerald-300",
  Cancelled: "rose-700",
  Served: "cyan-200",
};

const Orders = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurantIds, setRestaurantIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: "Pending" | "Approved" | "Cancelled" | "Served";
  }>({});

  useEffect(() => {
    if (id) {
      fetchRestaurants();
    }
  }, [id]);

  const fetchRestaurants = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/restaurant/v1/restaurants`;

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const values = {
        userId: id,
      };

      const response = await axios.post(url, values, config);

      const ids = response.data.data.map((item: { _id: string }) => item._id);
      setRestaurantIds(ids);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/payment/v1/restaurant/orders`;

      const data = {
        restaurantId: selectedId,
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
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderID: string) => {
    if (!selectedStatus[orderID] || !selectedId) return;

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/payment/v1/update`;

      const data = {
        orderId: orderID,
        status: selectedStatus[orderID],
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const result = await axios.post(url, data, config);

      if (!result) {
        toast({
          title: "Error updating status",
        });
      }

      toast({
        title: "Status updates",
      });

      orders.find((order) => {
        if (order._id === orderID) {
          order.status = selectedStatus[orderID];
        }
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const parseDate = (date: Date) => {
    const newDate = new Date(date);

    return `${newDate.getDay()}-${newDate.getMonth()}-${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  };

  return (
    <div className="p-4 flex-1 flex flex-col">
      <h2 className="text-lg text-custom-blue pb-4 border-b-2 border-custom-dark-blue">
        Orders
      </h2>

      <div className="flex items-center pt-4">
        <Select onValueChange={(value) => setSelectedId(value)}>
          <SelectTrigger
            className="w-full md:w-1/2 text-custom-black font-bold rounded-r-none"
            disabled={loading}
          >
            <SelectValue placeholder="Select a restaurant" />
          </SelectTrigger>
          <SelectContent>
            {restaurantIds.map((item: string) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="rounded-l-none"
          onClick={handleClick}
          disabled={loading}
        >
          Get orders
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
                <p className="font-bold">Table number {order.tableNumber}</p>
              </div>

              <div className="flex w-full items-center justify-between pt-2">
                <Select
                  onValueChange={(
                    value: "Pending" | "Cancelled" | "Approved" | "Served"
                  ) => setSelectedStatus({ [order._id]: value })}
                  value={selectedStatus[order._id]}
                >
                  <SelectTrigger className="flex-1 text-custom-black border-0 rounded-r-none">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Served">Served</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => handleUpdateStatus(order._id)}
                  className="rounded-l-none"
                  variant="custom"
                >
                  Update Status
                </Button>
              </div>

              <div
                className={`font-bold text-${
                  statusColors[order.status]
                } flex items-center justify-end`}
              >
                <p>Status: {order.status}</p>
                <Dot className={`bg-${statusColors[order.status]} h-10 w-10`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
