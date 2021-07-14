import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Container, Row, Col, Button } from "reactstrap";
import dropship from "../assets/img/courier.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class CourierPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container
        fluid
        style={{
          background:
            "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%",
          marginTop: "-5%",
          paddingBottom: "20%",
          paddingTop: "7%",
          paddingLeft: "0%",
          paddingRight: "0%",
        }}
      >
        <Row>
          <Col md="4"></Col>
          <Col md="4 mt-5" style={{ textAlign: "center" }}>
            <img src={dropship} width="100%" />
            <h3>Welcome Back {this.props.nama}!</h3>
            <Container>
              <Row>
                <Col md="12">
                  <p>
                    Input data pengiriman barang oleh courier, jangan lupa
                    perhatikan value form agar tidak terjadi kesalahan saat
                    penginputan data.
                  </p>
                </Col>
              </Row>
            </Container>
            <Link
              className="d-flex pr-5"
              to="/input"
              style={{
                display: "flex",
                textDecoration: "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button color="warning">Input Pengiriman</Button>
            </Link>
          </Col>
          <Col md="4"></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ usersReducer }) => {
  return {
    nama: usersReducer.nama,
    idrole: usersReducer.idrole,
    username: usersReducer.username,
  };
};

export default connect(mapStateToProps)(CourierPage);
