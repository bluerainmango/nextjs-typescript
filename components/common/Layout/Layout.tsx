import { FC } from "react"; // function component
import s from "./Layout.module.css";

// FC로 type 정해줘야 children을 Reactnode로 인식
const Layout: FC = ({ children }) => {
  return (
    <div className={s.root}>
      {/* <main style={{ color: "var(--primary)" }}> */}
      <main className='fit'>{children}</main>
    </div>
  );
};

export default Layout;
