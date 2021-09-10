import type { InferGetStaticPropsType } from "next";
// import getAllProducts from "../framework/shopify/product/get-all-products"; // ts file can be imported without ext name
import getAllProducts from "@framework/product/get-all-products"; // ts file can be imported without ext name
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid } from "@components/ui";

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

  return (
    <>
      <Grid>
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </>
  );
}

Home.Layout = Layout;
// Home.displayName = "Home";
