import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddCartItemPayload, CartItemTypes } from "@/app/common/CartItemData";

const HOST_NAME =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const initialState: CartItemTypes[] = [];

export const fetchCartItems = createAsyncThunk<CartItemTypes[], void>(
  "cart/fetchCartItems",
  async () => {
    try {
      const res = await fetch(`${HOST_NAME}/cart`);
      if (!res.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const jsonData = await res.json();
      return jsonData.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  }
);

export const addCartItem = createAsyncThunk<any, AddCartItemPayload>(
  "cart/addCartItem",
  async ({ newCartItem, UserData }) => {
    const response = await fetch(`${HOST_NAME}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newCartItem, UserData }),
    });
    if (!response.ok) {
      throw new Error("Adding item to cart failed");
    }
    const data = await response.json();
    return data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartId: string, thunkAPI) => {
    try {
      const response = await fetch(`${HOST_NAME}/cart/${cartId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete cart item");
      }
      return cartId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (updatedItem: CartItemTypes, thunkAPI) => {
    try {
      const response = await fetch(`${HOST_NAME}/cart/${updatedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update cart item");
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<CartItemTypes[]>) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action: any) => {
      return state.filter((item) => item._id !== action.payload);
    });
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      const existingItem = state.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.orderQuantity += 1;
      } else {
        state.push({ ...action.payload, orderQuantity: 1 });
      }
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state[index] = {
          ...action.payload,
          quantity: state[index].orderQuantity,
        };
      }
    });
  },
});

export default cartSlice.reducer;
