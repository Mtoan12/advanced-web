type User = {
  id: number;
  email: string;
  birthday: Date;
  first_name: string;
  last_name: string;
  password: string;
  gender: "male" | "female";
};

type SignInFields = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: 'male' | 'female';
  email: string;
  password: string;
}