import { ImageEdge, Product as ShopifyProduct } from "../schema";
import { Product } from "@common/types/product";

// 인자로 들어온 객체에서 edges prop만 빼는데, 이 prop의 type은 ImageEdge[] 다.(ImageEdge가 모인 arr)
const normalizeProductImages = ({ edges }: { edges: ImageEdge[] }) =>
  // node 객체를 destructurizing to {originalSrc: url, ...rest}
  edges.map(({ node: { originalSrc: url, ...rest } }) => ({
    url: `/images/${url}`,
    ...rest,
  })); //! correct
// function normalizeProductImages({edges: ImageEdge[]}) {} //! type 지정하는 법에서 error

// Normalize raw product data into data that is easy to use
export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+\/+$/g, ""), // remove slash /
    images: normalizeProductImages(imageConnection),
    ...rest,
  };

  return product;
}
