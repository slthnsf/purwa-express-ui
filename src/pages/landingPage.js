import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import GifPlayer from "react-gif-player";
import banner from "../assets/img/banner.gif";
import banner2 from "../assets/img/banner2.gif";
import banner3 from "../assets/img/Banner3.gif";
import PengirimanComp from "../components/pengirimanComp";
import MissionComp from "../components/missionComp";
import ServiceComp from "../components/serviceComp";
import TestimoniComp from "../components/testimoniComp";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container
        fluid
        className="p-0"
        style={{ marginTop: "-7%", zIndex: -1.5, position: "relative" }}
      >
        <Row>
          <Col md="12">
            <Carousel>
              <div>
                <GifPlayer
                  gif={banner}
                  style={{ width: "100%" }}
                  autoplay={true}
                />
              </div>
              <div>
                <GifPlayer
                  gif={banner2}
                  style={{ width: "100%" }}
                  autoplay={true}
                />
              </div>
              <div>
                <GifPlayer
                  gif={banner3}
                  style={{ width: "100%" }}
                  autoplay={true}
                />
              </div>
            </Carousel>
          </Col>
        </Row>
        <PengirimanComp />
        <MissionComp />
        <TestimoniComp />
        <ServiceComp />
      </Container>
    );
  }
}

export default LandingPage;
