import type { InferGetStaticPropsType } from "next";
// import getAllProducts from "../framework/shopify/product/get-all-products"; // ts file can be imported without ext name
import getAllProducts from "@framework/product/get-all-products"; // ts file can be imported without ext name
import { getConfig } from "@framework/api/config";

export async function getStaticProps() {
  const config = getConfig();
  const products = await getAllProducts(config);

  return {
    props: {
      products,
    },
    revalidate: 4 * 60 * 60, // revalidate every 4 hours
  };
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log(products);

  return <div>{JSON.stringify(products)}</div>;
}
