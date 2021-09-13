import type { InferGetStaticPropsType } from "next";
// import getAllProducts from "../framework/shopify/product/get-all-products"; // ts file can be imported without ext name
import getAllProducts from "@framework/product/get-all-products"; // ts file can be imported without ext name
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid, Hero, Marquee } from "@components/ui";

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
      <Hero
        headline='Fugiat quis fugiat irsadfsdf'
        description='Esse do ullamco adipisicing consectetur ex cillum dolor nisi deserunt officia esse mollit. Ipsum aliqua occaecat tempor est nulla cupidatat. Amet adipisicing ipsum dolore cillum nostrud est dolor. Consectetur irure exercitation incididunt eiusmod adipisicing consequat duis dolor pariatur anim mollit. Id sunt ipsum occaecat dolor est consectetur consequat occaecat dolor duis sint. Ullamco proident sint ipsum dolor et proident nostrud non pariatur officia ex ad incididunt. Nostrud anim fugiat amet minim.'
      />
      <Marquee>
        {products.slice(0, 3).map((product) => (
          <ProductCard variant='slim' key={product.id} product={product} />
        ))}
      </Marquee>
    </>
  );
}

Home.Layout = Layout;
// Home.displayName = "Home";
