import { FC, ReactNode } from "react";
import s from "./Grid.module.css";

const Grid: FC<ReactNode> = function ({ children }) {
  return <div className={`${s.root} hello`}>{children}</div>;
};

export default Grid;
