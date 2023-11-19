type User = {
  id: number;
  email: string;
  birthday: Date;
  first_name: string;
  last_name: string;
  password: string;
  gender: "male" | "female";
};

type RegisterDTO = {
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string | "MALE" | "FEMALE";
  email: string;
  password: string;
  role: string | "MEMBER" | "TEACHER";
};
