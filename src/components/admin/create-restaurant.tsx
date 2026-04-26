import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
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
import { CirclePlus, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { jwtDecode } from "jwt-decode";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useState } from "react";

type UserData = {
  userId: string;
  email: string;
  role: "Admin" | "User";
};

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
});

export const CreateRestaurant = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const user: UserData = jwtDecode(localStorage.getItem("token")!);

    const restaurant = {
      ...values,
      userId: user.userId,
    };

    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/restaurant/v1/create`;
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(url, restaurant, config);

      toast({
        title: "Created successfully",
      });

      console.log(response.data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <CirclePlus className="h-4 w-4 mr-2" />
          Create a restaurant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a restaurant</DialogTitle>
          <DialogDescription>
            Enter the details of the restaurant
          </DialogDescription>
          <Form {...form}>
            <form
              id="create-restaurant-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter name"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter description"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter location"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button
            form="create-restaurant-form"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-custom-blue" />
            ) : (
              "Create"
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
