import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Loader2, Minus, Plus, ScanBarcode } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import useCartStore from "@/providers/cart-provider";

type MenuItem = {
  category: string;
  description: string;
  name: string;
  price: string;
  restaurantId: string;
  _id: string;
};

const MenuList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const { addItem } = useCartStore((state) => state);
  const [loading, setLoading] = useState(false);

  if (searchParams.get("result")) {
    localStorage.setItem("restaurantId", searchParams.get("result")!);
  }

  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/restaurant/v1/menu`;

      const data = {
        restaurantId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(url, data, config);

      setMenu(response.data.data);
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewScan = () => {
    localStorage.removeItem("restaurantId");
    navigate("/home");
  };

  const addItemToCart = (item: MenuItem, count: number) => {
    if (count === 0) return;

    addItem(item, count);
    setCounters((prevCounters: { [key: string]: number }) => ({
      ...prevCounters,
      [item._id]: 0,
    }));
    toast({
      title: `${item.name} added to cart`,
    });
  };

  const increaseCounter = (id: string) => {
    setCounters((prevCounters: { [key: string]: number }) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };

  const decreaseCounter = (id: string) => {
    setCounters((prevCounters: { [key: string]: number }) => ({
      ...prevCounters,
      [id]: prevCounters[id] > 0 ? prevCounters[id] - 1 : 0,
    }));
  };

  return (
    <div className="p-4 flex-1 flex flex-col">
      <div className="pb-4 border-b-2 border-custom-dark-blue flex items-center justify-between">
        <h2 className="text-lg text-custom-blue">Menu</h2>
        {restaurantId && <Button onClick={handleNewScan}>Scan new QR</Button>}
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-custom-blue animate-spin" />
        </div>
      )}

      {!restaurantId && (
        <div className="flex-1 py-4 flex items-center justify-center">
          <Button
            size="lg"
            className="flex items-center gap-1"
            onClick={() => navigate("/home")}
          >
            <ScanBarcode className="h-5 w-5" />
            <span>Scan QR Code</span>
          </Button>
        </div>
      )}

      {restaurantId && (
        <div className="py-4 flex">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {menu.map((item) => (
              <div
                className="bg-custom-dark-blue p-2 rounded-md w-full"
                key={item._id}
              >
                <h2 className="font-bold text-lg text-custom-black">
                  {item.name}
                </h2>

                <p className="text-custom-blue font-bold">{item.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-custom-black font-bold text-lg">
                    Rs. {item.price}
                  </p>
                  <span className="bg-custom-blue px-2 rounded-md shadow-sm text-custom-black font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-2 border-t-2 border-custom-black">
                  <div className="flex items-center">
                    <Button
                      size="icon"
                      variant="custom"
                      className="rounded-r-none h-8 w-8"
                      onClick={() => decreaseCounter(item._id)}
                    >
                      <Minus className="text-custom-blue h-4 w-4" />
                    </Button>
                    <p className="text-custom-black font-bold text-center px-3 py-1 bg-custom-blue">
                      {counters[item._id] || 0}
                    </p>
                    <Button
                      size="icon"
                      variant="custom"
                      className="rounded-l-none h-8 w-8"
                      onClick={() => increaseCounter(item._id)}
                    >
                      <Plus className="text-custom-blue h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="custom"
                    className="flex items-center justify-center"
                    onClick={() => addItemToCart(item, counters[item._id])}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
