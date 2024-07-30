import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

interface ProductType {
  _id: string;
  name: string;
  brand: string;
  image: string;
}

const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await axios.get("/api/products");
  const productData: ProductType[] = res.data.data.map(
    (product: ProductType) => ({
      _id: product._id,
      name: product.name,
      image: product.image,
      brand: product.brand,
    })
  );
  return productData;
};

export default function MultiStepAutoComplete() {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  console.log("products", products);
  const [brands, setBrands] = React.useState<string[]>([]);
  console.log("brand", brands);
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const [selectedValues, setSelectedValues] = React.useState<{
    brand: string | null;
    product: ProductType | null;
  }>({ brand: null, product: null });
  console.log("selectedProduct", selectedProduct);
  console.log("selectedBrand", selectedBrand);
  console.log("selectedValues", selectedValues);
  React.useEffect(() => {
    const getProductInfo = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);

        const uniqueBrands = Array.from(
          new Set(productData.map((product) => product.brand))
        );
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Failed to fetch product information", error);
      }
    };
    getProductInfo();
  }, []);

  const handleBrandChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedBrand(value);
    setSelectedProduct(null);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      brand: value,
      product: null,
    }));
  };

  const handleProductChange = (
    event: React.ChangeEvent<{}>,
    value: ProductType | null
  ) => {
    setSelectedProduct(value);
    setSelectedValues((prevValues) => ({ ...prevValues, product: value }));
  };

  const filteredProducts = products.filter(
    (product) => product.brand === selectedBrand
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
      <Autocomplete
        id="brand-select"
        options={brands}
        autoHighlight
        value={selectedBrand}
        onChange={handleBrandChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a brand"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          />
        )}
      />

      {selectedBrand && (
        <Autocomplete
          id="product-select"
          options={filteredProducts}
          getOptionLabel={(option) => option.name}
          autoHighlight
          value={selectedProduct}
          onChange={handleProductChange}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <img
                loading="lazy"
                width="20"
                src={option.image}
                alt={option.name}
                style={{ marginRight: 8 }}
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a product"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
      )}

      {selectedProduct && (
        <Autocomplete
          id="variant-select"
          options={filteredProducts}
          getOptionLabel={(option) => option.name}
          autoHighlight
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <img
                loading="lazy"
                width="20"
                src={option.image}
                alt={option.name}
                style={{ marginRight: 8 }}
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a variant"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
      )}
    </Box>
  );
}
