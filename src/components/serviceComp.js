import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import background from "../assets/img/world3.png";
import store from "../assets/img/store.png";

class ServiceComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container
        fluid
        className="mt-5 p-3"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "100% 90%",
          backgroundRepeat: "no-repeat",
          marginBottom: "6%",
        }}
      >
        <Row>
          <Col md="12">
            <h2
              style={{
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
                textShadow: "2px 2px 5px #ccc",
                textAlign: "center",
              }}
            >
              PELAYANAN
              <span style={{ fontWeight: "bolder", color: "rgb(246,193,113)" }}>
                <br></br> & SOLUSI PURWA EXPRESS
              </span>
            </h2>
          </Col>
          <Col md="1"></Col>
          <Col md="3">
            <img
              src={store}
              width="30%"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h5
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
              }}
            >
              E-MARKET PLACE
            </h5>
            <p style={{ textAlign: "center" }}>
              Dengan integrasi API kami, kami dapat menyediakan pelacakan paket
              real-time E-Marketplace untuk pedagang/pelanggan Anda.
            </p>
          </Col>
          <Col md="3">
            <img
              src={store}
              width="30%"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h5
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
              }}
            >
              E-COMMERCE
            </h5>
            <p style={{ textAlign: "center" }}>
              bisnis e-niaga dapat menggunakan platform berbasis kami untuk
              menjadwalkan pengiriman, atau berintegrasi dengan perangkat lunak
              berkemampuan API kami untuk proses otomatis tanpa kerumitan.
            </p>
          </Col>
          <Col md="3">
            <img
              src={store}
              width="30%"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h5
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
              }}
            >
              E-MARKET PLACE
            </h5>
            <p style={{ textAlign: "center" }}>
              Dengan integrasi API kami, kami dapat menyediakan pelacakan paket
              real-time E-Marketplace untuk pedagang/pelanggan Anda.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ServiceComp;
