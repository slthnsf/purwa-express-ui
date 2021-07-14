import React from "react";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authLogin, authLogout } from "../../actions";

class NavbarAdminComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
    };
  }

  render() {
    return (
      <Navbar
        expand="md"
        style={{ backgroundColor: "rgb(247,190,103)" }}
        className="mb-3 my-navbar navbar-light"
      >
        <NavbarBrand href="/"></NavbarBrand>
        <NavbarToggler
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
        />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="m-auto" navbar>
            <NavItem>
              <NavLink href="#">
                <Link className="d-flex pr-5" to="/">
                  <h5 style={{ color: "black" }}>HOME</h5>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <Link className="d-flex pr-5" to="/kirim">
                  <h5 style={{ color: "black" }}>INPUT PENGIRIMAN</h5>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <Link className="d-flex pr-5" to="/courier">
                  <h5 style={{ color: "black" }}>COURIER</h5>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">
                <Link className="d-flex pr-5" to="/history">
                  <h5 style={{ color: "black" }}>HISTORY</h5>
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <NavItem style={{ listStyleType: "none" }}>
          {this.props.username ? (
            <UncontrolledDropdown>
              <DropdownToggle
                DropdownToggle
                nav
                caret
                style={{ color: "gray" }}
              >
                Hello, {this.props.username}
              </DropdownToggle>
              <DropdownMenu right>
                {this.props.idrole == 2 || this.props.idrole == 3 ? (
                  <>
                    <DropdownItem>Status Pengiriman</DropdownItem>
                  </>
                ) : (
                  <>
                    <Link
                      to="/kirim"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <DropdownItem>Pengiriman Baru</DropdownItem>
                    </Link>
                    <Link
                      to="/history"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <DropdownItem>History Pengiriman</DropdownItem>
                    </Link>
                  </>
                )}
                <DropdownItem divider />
                <DropdownItem onClick={this.props.authLogout}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <>
              <NavbarText>
                <a
                  className="btncustom"
                  onClick={() => {
                    this.setState({ modal: !this.state.modal });
                  }}
                >
                  LOGIN
                </a>
              </NavbarText>
              &nbsp;
              <NavbarText>
                <Link className="d-flex pr-5" to="/register">
                  <a className="btncustom d-fllex justify-content-center text-decoration-none align-items-center">
                    SIGNUP
                  </a>
                </Link>
              </NavbarText>
            </>
          )}
        </NavItem>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ usersReducer }) => {
  return {
    idrole: usersReducer.idrole,
    username: usersReducer.username,
  };
};

export default connect(mapStateToProps, { authLogin, authLogout })(
  NavbarAdminComp
);
