import { FC } from "react";
import Link from "next/link";

import { Bag as Cart, Heart } from "@components/icons";
import { useUI } from "@components/ui/context";

import s from "./Usernav.module.css";

const Usernav: FC = () => {
  const { openSidebar } = useUI();

  return (
    <nav>
      <ul className={s.list}>
        <li className={s.item}>
          <Cart onClick={openSidebar} />
        </li>
        <li className={s.item}>
          <Link href='/wishlist'>
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Usernav;
