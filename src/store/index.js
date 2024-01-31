import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUser } from "./UserSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export { fetchUser };
export default store;
