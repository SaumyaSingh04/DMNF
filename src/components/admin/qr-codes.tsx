import { useEffect, useState } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../ui/select";
import axios from "axios";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const QRCodes = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [restaurantIds, setRestaurantIds] = useState<string[]>([]);
  const [restaurant, setRestaurant] = useState("");
  const [qrcodeUrl, setQrcodeUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!restaurant) return;

    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/qrcode/v1/generate`;

      const data = {
        restaurantId: restaurant,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(url, data, config);

      toast({
        title: "QR Code generated successfully",
      });

      setQrcodeUrl(response.data.data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 flex flex-col space-y-4">
      <h2 className="text-custom-blue pb-4 border-b-2 border-custom-dark-blue text-lg">
        QR Codes
      </h2>

      <div className="flex items-center w-full">
        <Select onValueChange={(value) => setRestaurant(value)}>
          <SelectTrigger className="text-custom-black font-bold w-full md:w-1/2 rounded-r-none">
            <SelectValue placeholder="Select a restaurant" />
          </SelectTrigger>
          <SelectContent>
            {restaurantIds.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="rounded-l-none" onClick={handleClick}>
          Get QR
        </Button>
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-custom-blue animate-spin" />
        </div>
      )}

      {!loading && (
        <div className="py-4 flex-1 flex items-center justify-center">
          {qrcodeUrl && (
            <img
              src={qrcodeUrl}
              alt="QRCode"
              width={300}
              height={300}
              className="rounded-md"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodes;
