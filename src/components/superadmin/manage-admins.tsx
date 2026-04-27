import { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Trash2, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

type AdminUser = {
  _id: string;
  email: string;
  role: string;
};

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Minimum 8 characters" }),
});

const ManageAdmins = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/v1/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(
        res.data.data.filter((u: AdminUser) =>
          ["Admin", "SuperAdmin"].includes(u.role)
        )
      );
    } catch {
      toast({ title: "Failed to fetch admins", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await axios.post(
        `${baseUrl}/auth/v1/create-admin`,
        { ...values, role: "Admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: "Admin created successfully" });
      form.reset();
      setOpen(false);
      fetchAdmins();
    } catch {
      toast({ title: "Failed to create admin", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`${baseUrl}/auth/v1/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId },
      });
      toast({ title: "Admin deleted" });
      setAdmins((prev) => prev.filter((a) => a._id !== userId));
    } catch {
      toast({ title: "Failed to delete admin", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 flex-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          Admins
          <span className="ml-2 text-sm font-normal bg-custom-dark-blue text-white px-2 py-0.5 rounded-full">
            {admins.filter((a) => a.role === "Admin").length}
          </span>
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="custom" className="flex gap-2">
              <UserPlus className="h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-custom-black text-white border-custom-dark-blue">
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@example.com"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Min 8 characters"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-custom-dark-blue w-full"
                  disabled={loading}
                >
                  Create Admin
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {admins.length === 0 ? (
        <p className="text-gray-400">No admins found.</p>
      ) : (
        <div className="rounded-md border border-custom-dark-blue overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-custom-dark-blue text-white">
              <tr>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-t border-custom-dark-blue hover:bg-white/5"
                >
                  <td className="px-4 py-3">{admin.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        admin.role === "SuperAdmin"
                          ? "bg-purple-700 text-white"
                          : "bg-blue-700 text-white"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {admin.role !== "SuperAdmin" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(admin._id)}
                        className="text-red-400 hover:text-red-600 hover:bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
