/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import api from "@/lib/axios";
import { useAuthStore } from "@/hooks/store/use-auth-store";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

type LoginFormValues = FormSchema;

const AuthForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  //   const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await api.post(
        `/api/users/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data) {
        // Ubah format data sesuai dengan type User
        const userData = {
          data: {
            email: response.data.data.email,
            name: response.data.data.name,
            role: response.data.data.role,
          },
        };

        setAuth(userData);
        const { isAdmin } = response.data.data;
        if (isAdmin) {
          console.log("admin routes active");
          navigate({ to: "/" });
        } else {
          console.log("user routes active");
          navigate({ to: "/dashboard" });
        }
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message.includes("401")) {
        setError("Incorrect personal number or password");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Masuk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      //   onlyNumbers={true}
                      placeholder="Email"
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {err && <p className="text-red-500">{err}</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Masuk
            </Button>
            {/* {loading ? (
              <ButtonLoading />
            ) : (
              <Button className="w-full" type="submit">
                Masuk
              </Button>
            )} */}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AuthForm;
