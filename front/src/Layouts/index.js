import Footer from "./Footer/index.js";
import Header from "./Header/index.js";

const Layout = ({ userType, name, isLogined, setIsLogined, children }) => {
  return (
    <div>
      <Header
        userType={userType}
        name={name}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
