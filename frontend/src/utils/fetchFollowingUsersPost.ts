import axios from "axios";

export const fetchFollowingUsersPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/api/v1/followingposts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response == null || undefined) {
      return (response.data = "user doesnt follows anyone");
    }
    return response.data;
  } catch (err) {
    console.log("Error occurred while fetching the post");
  }
};
