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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import GifPlayer from "react-gif-player";
import logogif from "../assets/img/Purwa Express.gif";
import logo from "../assets/img/logo.png";
import "../assets/css/style.css";
import logo1 from "../assets/img/logo.gif";
import loginback from "../assets/img/loginback.jpg";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authLogin, authLogout } from "../actions";

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, modal: false };
  }

  onBtLogin = () => {
    this.props.authLogin(this.inputEmail.value, this.inputPassword.value);

    this.setState({ modal: false });
  };

  printLogin = () => {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.setState({ modal: !this.state.modal });
          }}
        >
          {/* <ModalHeader>Modal title</ModalHeader> */}
          <ModalBody>
            <Container
              style={{
                background: "rgb(253,253,253)",
                backgroundImage: `url(${loginback})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Row>
                <Col md="12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>Masuk</h3>
                    <a
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
                      }}
                      style={{ cursor: "pointer", fontSize: "4vh" }}
                    >
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                </Col>
                <Col md="12">
                  <img
                    src={logo1}
                    width="50%"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "50%",
                    }}
                  />
                </Col>

                <Col md="12" className="mt-3 ">
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        placeholder="Masukkan Email"
                        innerRef={(elemen) => (this.inputEmail = elemen)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        placeholder="Masukkan Password"
                        innerRef={(elemen) => (this.inputPassword = elemen)}
                      />
                    </FormGroup>
                  </Form>
                  <Button
                    color="warning"
                    className="btncustom"
                    onClick={() => this.onBtLogin()}
                    style={{
                      background: "rgb(254,104,84)",
                      color: "white",
                      width: "100%",
                      borderRadius: "5%",
                    }}
                  >
                    Login
                  </Button>
                  <Link
                    className="d-flex pr-5"
                    to="/register"
                    style={{ textDecoration: "none" }}
                    onClick={() => this.setState({ modal: !this.state.modal })}
                  >
                    <p style={{ textAlign: "right", marginTop: "1vh" }}>
                      Don't have an account ?
                    </p>
                  </Link>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  };

  render() {
    return (
      <Navbar expand="md" className="mb-3 my-navbar navbar-light">
        {this.printLogin()}
        {/* <NavbarToggler
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen });
          }}
        /> */}
        {/* <Collapse isOpen={this.state.isOpen} navbar> */}
          <Nav className="m-auto" navbar>
            <NavItem>
              <NavLink href="#">
                <Link className="d-flex pr-5" to="/">
                  <h5>HOME</h5>
                </Link>
              </NavLink>
            </NavItem>
            {this.props.idrole === 3 && (
              <NavItem>
                <NavLink href="#">
                  <Link className="d-flex pr-5" to="/status">
                    <h5>STATUS</h5>
                  </Link>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        {/* </Collapse> */}
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
                    <DropdownItem>
                      <Link
                        to="/admin"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Pengiriman Baru
                      </Link>
                    </DropdownItem>
                    <DropdownItem>History Pengiriman</DropdownItem>
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
                  style={{ color: "white" }}
                >
                  LOGIN
                </a>
              </NavbarText>
              &nbsp;
              <NavbarText>
                <Link className="d-flex pr-5" to="/register">
                  <a
                    className="btncustom d-fllex justify-content-center text-decoration-none align-items-center"
                    style={{ color: "white" }}
                  >
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

export default connect(mapStateToProps, { authLogin, authLogout })(NavbarComp);
