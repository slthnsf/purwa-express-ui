import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Button,
  Modal,
  Input,
  ModalBody,
} from "reactstrap";
import user from "../../assets/img/user.png";
import item from "../../assets/img/item.png";
import background from "../../assets/img/backregister.jpg";

class HistoryComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  printDetail = () => {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }} >
          <ModalBody>
            <h5>Detail</h5>
            <hr></hr>
            <Container>
              <Row>
                <Col md="12">
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    )
  }

  render() {
    return (
      <Container fluid className="p-0" style={{ background: "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%", height: "100vh" }} >
        <Row>
          <Col md="12 mt-3">
            <Container>
              <Row>
                {this.printDetail()}
                <h5>Admin</h5>
                <Col md="4 mt-3" style={{ background: "white", borderRadius: "15px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >
                  <Container fluid>
                    <Row>
                      <Col md="4 d-flex justify-content-center align-items-center">
                        <img src={user} width="65%" />
                      </Col>
                      <Col md="8 mt-2">
                        <h6>Nama Admin</h6>
                        <p style={{ color: "rgb(120,176,242)" }}>On Duty</p>
                      </Col>
                    </Row>
                  </Container>
                </Col>

                {/* KOLOM 2 */}

                <Col md="4 mt-3 ml-5"
                  style={{ background: "white", borderRadius: "15px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >
                  <Container fluid>
                    <Row>
                      <Col md="4 d-flex justify-content-center align-items-center">
                        <img src={item} width="60%" />
                      </Col>
                      <Col md="8 mt-2">
                        <h6>Barang Terikirm</h6>
                        <h3 style={{ color: "rgb(120,176,242)" }}>15</h3>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>

            {/* HISTORY */}
            <Container className="mt-5">
              <Row>
                <h5>History</h5>
                <Col md="12 mt-3">
                  <Card body style={{ borderRadius: "15px",
                      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >
                    <Container>
                      <Row>
                        <Col md="3">
                          <CardTitle tag="h6">Nama Barang</CardTitle>
                          <CardText>PWX#09897821</CardText>
                        </Col>
                        <Col md="3">
                          <CardTitle tag="h6">Tanggal Kirim</CardTitle>
                          <CardText>09/09/2021</CardText>
                        </Col>
                        <Col md="3">
                          <CardTitle tag="h6">Tanggal Sampai</CardTitle>
                          <CardText>12/09/2021</CardText>
                        </Col>
                        <Col md="3" style={{display: "flex", justifyContent: "center", alignItems: "center" }} >
                          <Button color="warning" onClick={() => { this.setState({ modal: !this.state.modal })}}>
                            Detail
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                </Col>
              </Row>
            </Container>
            {/* TUTUP HISTORY */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HistoryComp;