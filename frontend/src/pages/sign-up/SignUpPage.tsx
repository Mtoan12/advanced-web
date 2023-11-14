import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signUpSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      gender: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev: boolean) => !prev);
  };
  return (
    <main className="container flex max-w-[1024px] flex-col justify-center py-20">
      <h1 className="mb-4 text-center text-4xl font-bold">
        Create new account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...field}
                      className={cn(
                        form.formState.errors.firstName &&
                          "border-red-400 focus-visible:ring-red-400",
                        "pr-8",
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...field}
                      className={cn(
                        form.formState.errors.lastName &&
                          "border-red-400 focus-visible:ring-red-400",
                        "pr-8",
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className={cn(
                      form.formState.errors.email &&
                        "border-red-400 focus-visible:ring-red-400",
                      "pr-8",
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Date of birth"
                      type="date"
                      {...field}
                      className={cn(
                        form.formState.errors.birthday &&
                          "border-red-400 focus-visible:ring-red-400",
                        "pr-8",
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl
                      className={cn(
                        form.formState.errors.birthday &&
                          "border-red-400 focus-visible:ring-red-400",
                        "pr-8",
                      )}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className={cn(
                        form.formState.errors.password &&
                          "border-red-400 focus-visible:ring-red-400",
                        "pr-8",
                      )}
                    />
                    <div
                      className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer hover:opacity-80"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Link to="/login">
              <Button variant={"outline"}>Had an account</Button>
            </Link>
            <Button type="submit">Sign up</Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default SignUpPage;
