import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root.tsx";
import About from "../pages/About/About.tsx";
import Blogs from "../pages/Blogs/Blogs.tsx";
import Contact from "../pages/Contact/Contact.tsx";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage.tsx";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword.tsx";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import ProductDetail from "../pages/ProductDetail/ProductDetail.tsx";
import Register from "../pages/Register/Register.tsx";
import Shop from "../pages/Shop/Shop.tsx";
import Cart from "../pages/Cart/Cart.tsx";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default App;
