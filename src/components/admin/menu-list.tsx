import { useState } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface MenuListProps {
  restaurantIds: string[];
}

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  restaurantId: string;
};

const MenuList = ({ restaurantIds }: MenuListProps) => {
  const { toast } = useToast();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/restaurant/v1/menu`;

      const data = {
        restaurantId: id,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(url, data, config);

      toast({
        title: "Menu fetched successfully",
      });

      setMenu(response.data.data);
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

  return (
    <div className="py-4 flex-1 flex flex-col">
      <div className="flex items-center">
        <Select onValueChange={(value) => setId(value)}>
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
          Get menu
        </Button>
      </div>

      {loading && (
        <div className="py-4 flex-1 flex items-center justify-center mt-4">
          <Loader2 className="animate-spin h-8 w-8 text-custom-blue" />
        </div>
      )}

      <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {menu.length > 0 &&
          menu.map((item) => (
            <div className="bg-custom-dark-blue rounded-md p-2">
              <h3 className="text-custom-black text-lg font-bold">
                {item.name}
              </h3>

              <p className="text-custom-blue font-bold">{item.description}</p>

              <div className="w-full flex items-center justify-between">
                <p className="text-custom-blue text-lg font-bold p-2 rounded-md text-end">
                  Price: Rs. {item.price}
                </p>
                <span className="bg-custom-blue ml-auto px-2 text-custom-black rounded-full shadow-sm font-bold">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuList;
