import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavbarComp from "./components/navbarComp";
import NavbarAdminComp from "./components/admin/navbarAdminComp";
import RegistCourComp from "./components/admin/registCourComp";
import NavbarCourComp from "./components/courier/navbarCourComp";
import StatusComp from "./components/users/statusComp";
import SendComp from "./components/courier/sendComp";
import KirimComp from "./components/admin/kirimComp";
import LandingPage from "./pages/landingPage";
import CourierPage from "./pages/courierPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import FooterComp from "./components/footerComp";
// import HistoryComp from "./components/admin/historyComp";
import "./assets/css/style.css";
import { URL_API } from "./helper";
import axios from "axios";
import {
  keepLogin,
  getDataPacketAction,
  getData,
  getKota,
  getPengiriman,
  getRoleUsers,
  getStatus,
} from "./actions";
import { connect } from "react-redux";
import historyAdmin from "./components/admin/historyAdmin";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.reLogin();
    this.props.getDataPacketAction();
    this.props.getData();
    this.props.getKota();
    this.props.getRoleUsers();
    this.props.getPengiriman();
    this.props.getStatus();
  }

  reLogin = () => {
    let token = localStorage.getItem("tkn_id");
    if (token) {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(URL_API + `/users/keep`, {}, headers)
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
              <Route path="/kirim" component={KirimComp} />
              <Route path="/history" component={historyAdmin} />
            </Switch>
            <FooterComp />
          </>
        ) : this.props.idrole === 2 ? (
          <>
            <NavbarCourComp />
            <Switch>
              <Route path="/" component={CourierPage} exact />
              <Route path="/input" component={SendComp} />
            </Switch>
            <FooterComp />
          </>
        ) : this.props.idrole === 3 ? (
          <>
            <NavbarComp />
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path="/status" component={StatusComp} exact />
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

export default connect(mapStateToProps, {
  keepLogin,
  getDataPacketAction,
  getData,
  getKota,
  getRoleUsers,
  getPengiriman,
  getStatus,
})(App);
