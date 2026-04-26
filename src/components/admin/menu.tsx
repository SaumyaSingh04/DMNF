import { useEffect, useState } from "react";
import { AddItem } from "./add-item";
import axios from "axios";
import MenuList from "./menu-list";

const Menu = ({ id }: { id: string }) => {
  const [restaurantIds, setRestaurantIds] = useState<string[]>([]);

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

  return (
    <div className="p-4 flex-1 flex flex-col">
      <div className="pb-4 border-b-2 border-custom-dark-blue flex items-center justify-between">
        <h2 className="text-lg text-custom-blue">Menu</h2>
        <AddItem restaurantIds={restaurantIds} />
      </div>

      <MenuList restaurantIds={restaurantIds} />
    </div>
  );
};

export default Menu;
