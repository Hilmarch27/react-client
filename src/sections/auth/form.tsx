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
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const formSchema = z.object({
  pn: z.string().min(2, {
    message: "Personal number must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

type LoginFormValues = FormSchema;

const AuthForm = () => {
  const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const pnAsInt = parseInt(values.pn, 10);

      const response = await axios.post(
        `/api/auth/login`,
        {
          pn: pnAsInt,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data) {
        const { accessToken, refreshToken, isAdmin } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

        if (isAdmin) {
          navigate({ to: "/profile" });
        } else {
          navigate({ to: "/profile" });
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
              name="pn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Number</FormLabel>
                  <FormControl>
                    <Input
                      //   onlyNumbers={true}
                      placeholder="Personal Number"
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