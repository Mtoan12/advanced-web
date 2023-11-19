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
import { ProfileSchema, signUpSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      gender: "",
    },
  });

  const { user } = useAuth();
  if (user) {
    <Navigate to={"/"} />;
  }

  const onSubmit = (data: z.infer<typeof ProfileSchema>) => {
    saveProfile();
    console.log(data);
  };

  const setEditMode = () => {
    setIsEditMode(true);
  };

  const saveProfile = () => {
    setIsEditMode(false);
    console.log(isEditMode);
  };

  return (
    <main className="container flex max-w-[1024px] flex-col justify-center py-20">
      <h1 className=" text-center text-4xl font-bold">Profile</h1>
      {isEditMode ? (
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
                        placeholder="Tran"
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
                          <SelectValue placeholder="Male" />
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

            <div className="flex items-center justify-between">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="grid grid-cols-1 gap-1">
          <div className="container mx-auto ">
            <div className="mx-auto max-w-2xl rounded-md bg-white p-8 shadow-md">
              <div className="mb-6 flex items-center space-x-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Le Tran Thien Thang{" "}
                  </h3>
                  <p className="text-gray-500">thienthang@gmail</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Date of Birth:</h4>
                  <p>13/7</p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold">Gender:</h4>
                  <p>male</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="rounded-md bg-blue-500 px-4 py-2 text-white"
                  onClick={setEditMode}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
