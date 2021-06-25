import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavbarComp from "./components/navbarComp";
import NavbarAdminComp from "./components/admin/navbarAdminComp";
import RegistCourComp from "./components/admin/registCourComp";
import NavbarCourComp from "./components/courier/navbarCourComp";
// import KirimComp from "./components/admin/kirimComp";
import LandingPage from "./pages/landingPage";
import CourierPage from "./pages/courierPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import FooterComp from "./components/footerComp";
// import HistoryComp from "./components/admin/historyComp";
import "./assets/css/style.css";
import { URL_API } from "./helper";
import axios from "axios";
import { keepLogin } from "./actions";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.reLogin();
  }

  reLogin = () => {
    let token = localStorage.getItem("tkn_id");
    if (token) {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        }};
      axios.post(URL_API + `/users/keep`, {}, headers)
        .then((res) => {
          this.props.keepLogin(res.data);
        })
        .catch((err) => {
          console.log("Keeplogin error :", err);
        });
    }
  };

  render() {
    return (
      <div>
        {this.props.idrole === 1 ? (
          <>
            <NavbarAdminComp />
            <Switch>
              <Route path="/" component={AdminPage} exact />
              <Route path="/courier" component={RegistCourComp} />
            </Switch>
            <FooterComp />
          </>
        ) : this.props.idrole === 2 ? (
          <>
            <NavbarCourComp />
            <Switch>
              <Route path="/" component={CourierPage} />
            </Switch>
            <FooterComp />
          </>
        ) : (
          <>
            <NavbarComp />
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path="/register" component={RegisterPage} />
            </Switch>
            <FooterComp />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer }) => {
  return {
    idrole: usersReducer.idrole,
    username: usersReducer.username,
  };
};

export default connect(mapStateToProps, { keepLogin })(App);