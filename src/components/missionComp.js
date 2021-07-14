import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import GifPlayer from "react-gif-player";
import misi from "../assets/img/misi.gif";

class MissionComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid className="mt-5 p-3">
        <Row>
          <Col md="6">
            <GifPlayer gif={misi} style={{ width: "100%" }} autoplay={true} />
          </Col>
          <Col md="1"></Col>
          <Col md="4">
            <h2
              style={{
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
                textShadow: "2px 2px 5px #ccc",
              }}
            >
              CERITA
              <span
                style={{
                  fontWeight: "bolder",
                  color: "rgb(246,193,113)",
                  textShadow: "2px 2px 5px #ccc",
                }}
              >
                <br></br> & MISI PURWA EXPRESS
              </span>
            </h2>
            <p style={{ textAlign: "justify", color: "rgb(77,77,77)" }}>
              Kami berkomitmen dalam menyediakan dan mempertahankan standar
              layanan yang tinggi kepada mitra bisnis.
            </p>
            <p style={{ textAlign: "justify", color: "rgb(77,77,77)" }}>
              Kami mengadopsi pendekatan hybrid bottom-up dan top-down untuk
              memastikan eksekusi yang mulus dalam operasi dengan waktu henti
              minimum, Memenuhi kewajiban kami dengan kecepatan, keandalan, dan
              akuntabilitas.
            </p>
            <p style={{ textAlign: "justify", color: "rgb(77,77,77)" }}>
              Dengan demikian, menangani paket Anda kepada kami, dengan jaminan
              penuh bahwa mereka diperlakukan dengan sangat penting dan
              ditangani dengan sangat hati-hati. Memberi Anda ketenangan
              pikiran.
            </p>
            <p
              style={{
                fontWeight: "bolder",
                color: "rgb(253,103,83)",
                fontSize: "1.9vh",
              }}
            >
              KENAPA MEMILIH KITA ? "KOMITMEN KAMI KEPADA ANDA SANGAT BESAR"
            </p>
            <Button
              outline
              color="warning"
              style={{ fontWeight: "bolder", color: "rgb(253,102,82)" }}
            >
              READ MORE
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MissionComp;
