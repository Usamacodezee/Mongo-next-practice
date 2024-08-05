/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductTypes } from "@/app/common/ProductFormData";
import { ReviewTypes } from "@/app/common/ReviewForm";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const HOST_NAME =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const initialState: ProductTypes[] = [];

export const fetchProducts = createAsyncThunk<ProductTypes[], void>(
  "products/fetchProducts",
  async () => {
    try {
      const res = await fetch(`${HOST_NAME}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const jsonData = await res.json();
      return jsonData.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

export const addReviewAsync = createAsyncThunk<
  ProductTypes,
  { productId: string; review: ReviewTypes }
>("products/addReviewAsync", async ({ productId, review }) => {
  try {
    const response = await fetch(`${HOST_NAME}/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Failed to add review:", errorDetails);
      throw new Error(`Failed to add review: ${errorDetails}`);
    }
    const updatedReview = await response.json();
    return updatedReview as ProductTypes;
  } catch (error) {
    console.error("Error while adding review:", error);
    throw error;
  }
});

export const addProductAsync = createAsyncThunk<ProductTypes, ProductTypes>(
  "products/addProductAsync",
  async (newProduct) => {
    const response = await fetch(`${HOST_NAME}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error("Failed to add new product");
    }
    const data = await response.json();
    return data;
  }
);

export const updateProductAsync = createAsyncThunk<
  ProductTypes,
  { productid: number | null; product: ProductTypes }
>("products/updateProduct", async ({ productid, product }) => {
  try {
    const response = await fetch(`${HOST_NAME}/products/${productid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Failed to update product:", errorDetails);
      throw new Error(`Failed to update product: ${errorDetails}`);
    }
    const edited = await response.json();
    return edited as ProductTypes;
  } catch (error) {
    console.error("Error while updating product:", error);
    throw error;
  }
});

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await fetch(`${HOST_NAME}/products/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }
      return productId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<ProductTypes[]>) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addReviewAsync.fulfilled, (state, action) => {
      const updatedReview = action.payload;
      const productIndex = state.findIndex(
        (product) => product._id === updatedReview._id
      );
      if (productIndex !== -1) {
        state[productIndex] = updatedReview;
      }
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
