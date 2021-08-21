import type { InferGetStaticPropsType } from "next";
// import getAllProducts from "../framework/shopify/product/get-all-products"; // ts file can be imported without ext name
import getAllProducts from "@framework/product/get-all-products"; // ts file can be imported without ext name

export async function getStaticProps() {
  const products = await getAllProducts();

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
  console.log(products);

  return <div>{JSON.stringify(products)}</div>;
}
