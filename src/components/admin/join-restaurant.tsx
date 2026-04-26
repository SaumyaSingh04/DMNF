import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const formSchema = z.object({
  restaurantId: z.string(),
});

type UserData = {
  userId: string;
  email: string;
  role: "Admin" | "User";
};

export const JoinRestaurant = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/restaurant/v1/join`;
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const user: UserData = jwtDecode(localStorage.getItem("token")!);
      const data = { userId: user.userId, ...values };
      const response = await axios.post(url, data, config);
      toast({ title: "Restaurant joined successfully" });
      console.log(response.data);
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.log(error);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Join a restaurant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a restaurant</DialogTitle>
          <DialogDescription>Enter the restaurant ID to join</DialogDescription>
          <Form {...form}>
            <form
              id="join-restaurant-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="restaurantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">
                      Restaurant ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter restaurant ID"
                        className="text-custom-black"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button form="join-restaurant-form" type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-custom-blue" />
            ) : (
              "Join"
            )}
          </Button>
          <DialogClose asChild>
            <Button variant="destructive" disabled={loading}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
