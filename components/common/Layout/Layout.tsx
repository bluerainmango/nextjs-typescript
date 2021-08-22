import { FC } from "react"; // function component

// FC로 type 정해줘야 children을 Reactnode로 인식
const Layout: FC = ({ children }) => {
  return <div className='layout'>{children}</div>;
};

export default Layout;
