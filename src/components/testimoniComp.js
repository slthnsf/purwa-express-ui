import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import user from "../assets/img/default.png";
import testiback from "../assets/img/testiback.gif";
import testiback1 from "../assets/img/testiback1.gif";

class TestimoniComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  render() {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col md="12">
            <h2
              style={{
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
                textShadow: "2px 2px 5px #ccc",
                marginLeft: "2%",
              }}
            >
              TESTIMONI
              <span
                style={{
                  fontWeight: "bolder",
                  color: "rgb(246,193,113)",
                  textShadow: "2px 2px 5px #ccc",
                }}
              >
                <br></br>PURWA EXPRESS
              </span>
            </h2>
            <Carousel responsive={this.responsive}>
              <div
                className="ml-5 mr-5 pt-2 pb-2"
                style={{
                  borderRadius: "10%",
                }}
              >
                <Card
                  style={{
                    border: "none",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "10%",
                    backgroundImage: `url(${testiback})`,
                  }}
                >
                  <img
                    top
                    width="30%"
                    src={user}
                    alt="Card image cap"
                    className="m-auto rounded-circle mt-3"
                    style={{ boxShadow: "3px 3px 3px 3px #ccc" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" style={{ textAlign: "center" }}>
                      Agus Mulyana
                    </CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted "
                      style={{ textAlign: "center" }}
                    >
                      User
                    </CardSubtitle>
                    <CardText>
                      Pengirimannya cepat sekali, saya pesan paket regular yang
                      seharusnya sampai dalam 3 hari tapi sampai dirumah hanya
                      dalam waktu 1 hari.
                    </CardText>
                  </CardBody>
                </Card>
              </div>
              <div
                className="ml-5 mr-5 pt-2 pb-2"
                style={{
                  borderRadius: "10%",
                }}
              >
                <Card
                  style={{
                    border: "none",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "10%",
                    backgroundImage: `url(${testiback1})`,
                  }}
                >
                  <img
                    top
                    width="30%"
                    src={user}
                    alt="Card image cap"
                    className="m-auto rounded-circle mt-3"
                    style={{ boxShadow: "3px 3px 3px 3px #ccc" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" style={{ textAlign: "center" }}>
                      Agus Mulyana
                    </CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted "
                      style={{ textAlign: "center" }}
                    >
                      User
                    </CardSubtitle>
                    <CardText>
                      Pengirimannya cepat sekali, saya pesan paket regular yang
                      seharusnya sampai dalam 3 hari tapi sampai dirumah hanya
                      dalam waktu 1 hari.
                    </CardText>
                  </CardBody>
                </Card>
              </div>
              <div
                className="ml-5 mr-5 pt-2 pb-2"
                style={{
                  borderRadius: "10%",
                }}
              >
                <Card
                  style={{
                    border: "none",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "10%",
                    backgroundImage: `url(${testiback})`,
                  }}
                >
                  <img
                    top
                    width="30%"
                    src={user}
                    alt="Card image cap"
                    className="m-auto rounded-circle mt-3"
                    style={{ boxShadow: "3px 3px 3px 3px #ccc" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" style={{ textAlign: "center" }}>
                      Agus Mulyana
                    </CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted "
                      style={{ textAlign: "center" }}
                    >
                      User
                    </CardSubtitle>
                    <CardText>
                      Pengirimannya cepat sekali, saya pesan paket regular yang
                      seharusnya sampai dalam 3 hari tapi sampai dirumah hanya
                      dalam waktu 1 hari.
                    </CardText>
                  </CardBody>
                </Card>
              </div>
              <div
                className="ml-5 mr-5 pt-2 pb-2"
                style={{
                  borderRadius: "10%",
                }}
              >
                <Card
                  style={{
                    border: "none",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "10%",
                    backgroundImage: `url(${testiback1})`,
                  }}
                >
                  <img
                    top
                    width="30%"
                    src={user}
                    alt="Card image cap"
                    className="m-auto rounded-circle mt-3"
                    style={{ boxShadow: "3px 3px 3px 3px #ccc" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" style={{ textAlign: "center" }}>
                      Agus Mulyana
                    </CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-2 text-muted "
                      style={{ textAlign: "center" }}
                    >
                      User
                    </CardSubtitle>
                    <CardText>
                      Pengirimannya cepat sekali, saya pesan paket regular yang
                      seharusnya sampai dalam 3 hari tapi sampai dirumah hanya
                      dalam waktu 1 hari.
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TestimoniComp;
