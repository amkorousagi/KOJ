import Footer from "./Footer/index.js";
import Header from "./Header/index.js";

const Layout = ({ userType, name, isLogined, setIsLogined, children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Header
        userType={userType}
        name={name}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
      />
      <main
        style={{
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
