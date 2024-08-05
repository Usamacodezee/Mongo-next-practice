/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypes } from "@/app/common/UserFormData";

const HOST_NAME =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const initialState: UserTypes[] = [];

export const fetchUsers = createAsyncThunk<UserTypes[], void>(
  "users/fetchUsers",
  async () => {
    try {
      const res = await fetch(`${HOST_NAME}/users`);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const jsonData = await res.json();
      return jsonData.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
);

export const addUserAsync = createAsyncThunk<UserTypes, UserTypes>(
  "users/addUserAsync",
  async (newUser) => {
    const response = await fetch(`${HOST_NAME}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Failed to add new user");
    }
    const data = await response.json();
    return data;
  }
);

export const updateUserAsync = createAsyncThunk<
  UserTypes,
  { userid: any; user: any }
>("users/updateUser", async ({ userid, user }) => {
  try {
    const response = await fetch(`${HOST_NAME}/users/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update user: ${errorDetails}`);
    }
    const edited = await response.json();
    return edited as UserTypes;
  } catch (error) {
    console.error("Error while updating product:", error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userid: string, thunkAPI) => {
    try {
      const response = await fetch(`${HOST_NAME}/users/${userid}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }
      return userid;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<UserTypes[]>) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.findIndex((user) => user._id === updatedUser._id);
      if (userIndex !== -1) {
        state[userIndex] = updatedUser;
      }
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { addUsers } = usersSlice.actions;
export default usersSlice.reducer;
