import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Container, Row, Col, Button } from "reactstrap";
import dropship from "../assets/img/courier.png";
import { Link } from "react-router-dom";

class CourierPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid style={{ background: "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%", height: "95vh" }} >
        <Row>
          <Col md="12" style={{ textAlign: "center", paddingTop: "10vh" }}>
            <img src={dropship} width="40%" />
            <h3>Welcome Back Courier!</h3>
            <Container>
              <Row>
                <Col md="3"></Col>
                <Col md="6">
                  <p>
                    Input data pengiriman barang oleh admin, jangan lupa
                    perhatikan value form agar tidak terjadi kesalahan saat
                    penginputan data.
                  </p>
                  <Col md="3"></Col>
                </Col>
              </Row>
            </Container>
            <Link className="d-flex pr-5" to="/kirim"
              style={{ display: "flex", textDecoration: "none", justifyContent: "center", alignItems: "center" }} >
              <Button color="warning">Input Pengiriman</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CourierPage;