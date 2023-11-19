import instance from "./axiosConfig";

class AuthApi {
  async loadUser() {
    const res = await instance.get("/auth/loadUser");

    return res.data;
  }
  async login({ email, password }: { email: string; password: string }) {
    const res = await instance.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  }
  async register(signInFields: SignInFields) {
    const { email, password, firstName, lastName, dob, gender } = signInFields;
    const res = await instance.post("/auth/login", {
      email,
      password,
      dob, 
      gender,
      first_name: firstName,
      last_name: lastName,
    });

    return res.data;
  }
}

const authApi = new AuthApi();
export default authApi;
