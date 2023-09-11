import Footer from "./Footer/index.js";
import Header from "./Header/index.js";

const Layout = ({ userType, name, isLogined, setIsLogined, children }) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        userType={userType}
        name={name}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
      />
      <main style={{ position: "sticky" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
