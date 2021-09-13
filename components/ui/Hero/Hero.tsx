import { Component, FC } from "react";
import s from "./Hero.module.css";
import Link from "next/link";
import { Container } from "@components/ui";

interface props {
  headline: string;
  description: string;
}

const Hero: FC<props> = ({ headline, description }) => {
  return (
    <div className='bg-black'>
      <Container el={"h1" as any}>
        <div className={s.root}>
          <h2 className={s.headline}>{headline}</h2>
          <div className='flex-1 max-w-4xl'>
            <p className={s.description}>{description}</p>
          </div>
          <Link href='/'>
            <a className={s.link}>Read it here</a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
