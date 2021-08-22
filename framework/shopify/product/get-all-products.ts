//* Utils > index.ts
import { normalizeProduct, getAllProductsQuery } from "../utils";

//* GraphQL Query. Shopify Schema for type definition
import { ProductConnection } from "../schema";

//* Universal Types cross all platforms including Shopify
import { Product } from "@common/types/product";
import { ApiConfig } from "@common/types/api";

// Import Shopify's product schema so that inside props can be chained and used in 'getAllProducts' func.
type ReturnType = {
  products: ProductConnection;
};

// any type of array is returned as a result of promise
const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  });

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
