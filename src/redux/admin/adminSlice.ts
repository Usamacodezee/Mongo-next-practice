/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminTypes } from "@/app/common/UserFormData";
import axios from "axios";

const HOST_NAME =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const initialState: AdminTypes[] = [];

interface UpdatePasswordPayload {
  id: string; // Assuming admin ID
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const logoutAdminAsync = createAsyncThunk<any, void>(
  "users/adminLogout",
  async () => {
    try {
      const res = await fetch(`${HOST_NAME}/admin/logout`);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (!res.ok) {
        throw new Error("Failed to logout");
      }
      const jsonData = await res.json();
      return jsonData.data;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
);

export const addAdminAsync = createAsyncThunk<AdminTypes, AdminTypes>(
  "admin/addAdminAsync",
  async (newAdmin) => {
    const response = await fetch(`${HOST_NAME}/admin/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdmin),
    });
    if (!response.ok) {
      throw new Error("Failed to add new user");
    }
    const data = await response.json();
    console.log("admin created", data);
    return data;
  }
);

export const loginAdminAsync = createAsyncThunk<any, any>(
  "admin/loginAdminAsync",
  async (newAdmin) => {
    const response = await fetch(`${HOST_NAME}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdmin),
    });
    if (!response.ok) {
      throw new Error("admin login failed");
    }
    const data = await response.json();
    console.log("admin logged in", data);
    return data;
  }
);

export const updateAdminAsync = createAsyncThunk<
  AdminTypes,
  { adminid: string; admin: any }
>("admin/updateAdmin", async ({ adminid, admin }) => {
  try {
    console.log(`Updating admin with ID: ${adminid}`, admin);
    const response = await fetch(`/api/admin/${adminid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update admin: ${errorDetails}`);
    }

    const edited = await response.json();
    console.log("successfully updated admin data", edited);
    return edited as AdminTypes;
  } catch (error) {
    console.error("Error while updating admin:", error);
    throw error;
  }
});

export const updatePasswordAsync = createAsyncThunk(
  "auth/updatePassword",
  async (payload: UpdatePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/admin/PasswordUpdate/${payload.id}`,
        {
          currentPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (adminid: string, thunkAPI) => {
    try {
      const response = await fetch(`${HOST_NAME}/admin/${adminid}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete admin");
      }
      return adminid;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin: (state, action: PayloadAction<AdminTypes[]>) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAdminAsync.fulfilled, (state, action) => {
      const updateAdmin = action.payload;
      const adminIndex = state.findIndex(
        (admin) => admin._id === updateAdmin._id
      );
      if (adminIndex !== -1) {
        state[adminIndex] = updateAdmin;
      }
    });

    builder.addCase(updatePasswordAsync.fulfilled, (state, action) => {
      const updatedAdmin = action.payload;
      const adminIndex = state.findIndex(
        (admin) => admin._id === updatedAdmin._id
      );
      if (adminIndex !== -1) {
        state[adminIndex] = updatedAdmin;
      }
    });
    builder.addCase(addAdminAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(loginAdminAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(logoutAdminAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { addAdmin } = adminSlice.actions;
export default adminSlice.reducer;
