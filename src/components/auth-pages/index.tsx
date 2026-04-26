import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signin from "./signin";
import Signup from "./signup";

const AuthPage = () => {
  return (
    <Tabs
      defaultValue="account"
      className="w-full flex-1 flex flex-col items-center justify-center"
    >
      <TabsList className="bg-custom-black text-custom-blue">
        <TabsTrigger value="sign-in">Signin</TabsTrigger>
        <TabsTrigger value="sign-up">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Signin />
      </TabsContent>
      <TabsContent value="sign-up">
        <Signup />
      </TabsContent>
    </Tabs>
  );
};

export default AuthPage;
