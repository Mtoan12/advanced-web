import { formatDate } from "@/lib/utils";
import instance from "./axiosConfig";

class ProfileApi {
  async updateProfile(profile: ProfileFields) {
    return await instance.put("/users", {
      id: profile.id,
      first_name: profile.firstName,
      last_name: profile.lastName,
      dob: formatDate(profile.birthday),
      gender: profile.gender,
    });
  }
}

const profileApi = new ProfileApi();
export default profileApi;
