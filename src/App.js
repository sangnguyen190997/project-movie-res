import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { Suspense, lazy } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import ShowTime from "./pages/Admin/Films/ShowTime/ShowTime";
import Users from "./pages/Admin/Users/Users";
import AddUsers from "./pages/Admin/Users/AddUsers/AddUsers";
import EditUsers from "./pages/Admin/Users/EditUsers/EditUsers";

// const CheckoutTemplate = lazy(() =>
//   import("./templates/CheckoutTemplate/CheckoutTemplate")
// );
export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        {/* <HomeTemplate path="/contact" exact Component={Contact} /> */}
        {/* <HomeTemplate path="/news" exact Component={News} /> */}

        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login} />

        {/* <Suspense fallback={<h1>LOADING...</h1>}>
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
      </Suspense> */}
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/users" exact Component={Users} />
        <AdminTemplate
          path="/admin/users/addusers"
          exact
          Component={AddUsers}
        />
        <AdminTemplate
          path="/admin/users/editusers/:id"
          exact
          Component={EditUsers}
        />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate
          path="/admin/films/showtime/:id/:tenphim"
          exact
          Component={ShowTime}
        />
      </Switch>
    </Router>
  );
}

export default App;
