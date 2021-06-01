import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./Pages/firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const Register = lazy(() => import("./Pages/Register"));
const Header = lazy(() => import("./Components/Nav/Header"));
const RegisterComplete = lazy(() => import("./Pages/RegisterComplete"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const History = lazy(() => import("./Pages/user/History"));
const UserRoute = lazy(() => import("./Components/routes/UserRoute"));
const Password = lazy(() => import("./Pages/user/Password"));
const Wishlist = lazy(() => import("./Pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./Pages/admin/AdminDashboard"));
const AdminRoute = lazy(() => import("./Components/routes/AdminRoute"));
const CategoryCreate = lazy(() =>
  import("./Pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./Pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./Pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./Pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./Pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./Pages/admin/product/AllProducts"));
const AdminProductCard = lazy(() =>
  import("./Components/cards/AdminProductCard")
);
const ProductUpdate = lazy(() => import("./Pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./Pages/Product"));
const CategoryHome = lazy(() => "./Pages/category/CategoryHome");
const SubHome = lazy(() => "./Pages/sub/SubHome");
const Shop = lazy(() => import("./Pages/Shop"));
const Cart = lazy(() => import("./Pages/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Payment = lazy(() => import("./Pages/Payment"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __Get At
          <LoadingOutlined />
          Doorstep__
        </div>
      }
    >
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />;
        <Route exact path="/login" component={Login} />;
        <Route exact path="/register" component={Register} />;
        <Route exact path="/register/complete" component={RegisterComplete} />;
        <Route exact path="/forgot/password" component={ForgotPassword} />;
        <UserRoute exact path="/user/history" component={History} />;
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
