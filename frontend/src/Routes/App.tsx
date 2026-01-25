import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root.tsx";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Register from "../pages/Register/Register.tsx";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword.tsx";
import Shop from "../pages/Shop/Shop.tsx";
import Blogs from "../pages/Blogs/Blogs.tsx";
import About from "../pages/About/About.tsx";
import Contact from "../pages/Contact/Contact.tsx";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage.tsx";

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
