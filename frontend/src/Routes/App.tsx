import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root.tsx";
import About from "../pages/About/About.tsx";
import Blogs from "../pages/Blogs/Blogs.tsx";
import Cart from "../pages/Cart/Cart.tsx";
import Checkout from "../pages/Checkout/Checkout.tsx";
import Contact from "../pages/Contact/Contact.tsx";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage.tsx";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword.tsx";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import ProductDetail from "../pages/ProductDetail/ProductDetail.tsx";
import Register from "../pages/Register/Register.tsx";
import Shop from "../pages/Shop/Shop.tsx";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess.tsx";

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
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
    ],
  },
]);

export default App;
