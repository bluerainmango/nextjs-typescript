// Utils
import { fetchApi, normalizeProduct, getAllProductsQuery } from "../utils";

// import fetchApi from "../utils/fetch-api";
// import { normalizeProduct } from "../utils/normalize";
// import getAllProductsQuery from "../utils/queries/get-all-products";

// GraphQL Query
// Shopify Schema for type definition
import { ProductConnection } from "../schema";

// Universal Types cross all platforms including Shopify
// import { Product } from "../../common/types/product";
import { Product } from "@common/types/product";

// Import Shopify's product schema so that inside props can be chained and used in 'getAllProducts' func.
type ReturnType = {
  products: ProductConnection;
};

// any type of array is returned as a result of promise
const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await fetchApi<ReturnType>({ query: getAllProductsQuery });

  //* Normalize products: [{product1}, {product2}...]
  // Changing fetched data directory to utilize in our app
  // product: alias to change prop name 'node' to something else
  // if null or undefined returned, change it to []
  const products =
    data.products.edges.map(({ node: product }) => normalizeProduct(product)) ??
    [];

  // normalize and return new data
  return products;
};

export default getAllProducts;
