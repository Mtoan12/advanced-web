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
import { Edit, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
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

  const { user } = useAuth();
  if (user) {
    <Navigate to={"/"} />;
  }

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
  };

  const setEditMode = () => {
    setIsEditMode(true);
  };

  const saveProfile = () => {
    setIsEditMode(false);
  };

  return (
    <main className="container flex max-w-[1024px] flex-col justify-center py-20">
      <h1 className="mb-4 text-center text-4xl font-bold">Account Setting</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name:</FormLabel>
                  {isEditMode ? (
                    <FormControl>
                      <Input
                        placeholder="Tran"
                        {...field}
                        className={cn(
                          form.formState.errors.firstName &&
                            "border-red-400 focus-visible:ring-red-400",
                          "pr-8",
                        )}
                        readOnly={!isEditMode}
                      />
                    </FormControl>
                  ) : (
                    <div className="rounded-md border border-gray-300 p-2">
                      Tran
                    </div>
                  )}
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
                  {isEditMode ? (
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        {...field}
                        className={cn(
                          form.formState.errors.lastName &&
                            "border-red-400 focus-visible:ring-red-400",
                          "pr-8",
                        )}
                        readOnly={!isEditMode}
                      />
                    </FormControl>
                  ) : (
                    <div className="rounded-md border border-gray-300 p-2">
                      Toan
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth:</FormLabel>
                  {isEditMode ? (
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
                  ) : (
                    <div className="rounded-md border border-gray-300 p-2">
                      07/13/2002
                    </div>
                  )}

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

                  {isEditMode ? (
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
                          <SelectValue placeholder="Male" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="rounded-md border border-gray-300 p-2">
                      Male
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button onClick={setEditMode}>Edit</Button>
            <Button type="submit" onClick={saveProfile}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default ProfilePage;
