import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Modal,
  ModalBody,
  Alert,
} from "reactstrap";
import Carousel from "react-multi-carousel";
import testiback1 from "../../assets/img/testiback1.gif";
import testiback from "../../assets/img/testiback.gif";
import { connect } from "react-redux";
import axios from "axios";

class sendComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIndex: 0,
      isIndex2: 0,
      modal: false,
      isOpen: false,
      message: "",
      color: "",
      dataPengiriman: [],
      dataKota: [],
      dataStatus: [],
    };
  }

  componentDidMount() {
    this.getPengiriman();
    this.getKota();
    this.getStatus();
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

  getPengiriman = () => {
    axios
      .get("http://localhost:2000/courier/get-pengiriman")
      .then((res) => {
        this.setState({ dataPengiriman: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStatus = () => {
    axios
      .get("http://localhost:2000/courier/get-status")
      .then((res) => {
        this.setState({ dataStatus: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getKota = () => {
    axios
      .get(`http://localhost:2000/ongkir/getCity`)
      .then((res) => {
        this.setState({ dataKota: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateStatus = () => {
    axios
      .patch("http://localhost:2000/courier/update-status", {
        idpengiriman: this.state.dataPengiriman[this.resiIn.value].idpengiriman,
        iddata: this.state.dataPengiriman[this.resiIn.value].iddata,
        idstatus: parseInt(this.statusIn.value),
      })
      .then((res) => {
        this.setState({
          isOpen: !this.state.isOpen,
          color: "success",
          message: "Sukses Update Status",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onBtInputPengiriman = () => {
    axios
      .post(`http://localhost:2000/courier/add-pengiriman`, {
        idusers: this.props.data[this.state.isIndex].idusers,
        iddata: this.props.data[this.state.isIndex].iddata,
        idstatus: 2,
        resi: this.props.data[this.state.isIndex].resi,
        idcourier: this.props.idusers,
      })
      .then((res) => {
        this.setState({ modal: !this.state.modal });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printAccept = () => {
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
            <p style={{ textAlign: "center" }}>
              Apakah yakin akan mengambil paket ini ?
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <Button color="success" onClick={this.onBtInputPengiriman}>
                Iya
              </Button>
              &nbsp;
              <Button
                color="warning"
                onClick={() => {
                  this.setState({ modal: !this.state.modal });
                }}
              >
                Tidak
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  };

  render() {
    // console.log("data barang", this.props.data[this.state.isIndex].iddata);
    console.log("data barang", this.state.isIndex);
    console.log("data pengiriman", this.state.dataPengiriman);
    console.log("data users", this.props.idusers);
    console.log("index2", this.state.isIndex2);
    return (
      <Container
        fluid
        style={{
          background:
            "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%",
        }}
      >
        {this.printAccept()}
        <Row className="pt-4">
          <Col md="6 mt-3">
            <h5>
              Input Pengiriman<hr style={{ border: "3px solid black" }}></hr>
            </h5>
            <Alert color={this.state.color} isOpen={this.state.isOpen}>
              {this.state.message}
            </Alert>
            <Form className="mt-4">
              <FormGroup>
                <Label for="exampleResi">Resi</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  innerRef={(elemen) => (this.resiIn = elemen)}
                >
                  <option>Pilih Resi</option>
                  {this.state.dataPengiriman.map((item, idx) => {
                    return (
                      <>
                        <option value={idx}>{item.resi}</option>
                      </>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleResi">Status</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  innerRef={(elemen) => (this.statusIn = elemen)}
                >
                  <option>Pilih Status</option>
                  {this.state.dataStatus.map((item, idx) => {
                    return (
                      <>
                        <option value={item.idstatus}>
                          {item.desc_status}
                        </option>
                      </>
                    );
                  })}
                </Input>
              </FormGroup>
              <Button color="success" onClick={this.updateStatus}>
                Submit
              </Button>
            </Form>
          </Col>

          {/* CAROUSEL */}

          <Col md="6">
            <Container>
              <Row>
                <Col md="12">
                  <Container>
                    <Row>
                      <Col
                        md="6"
                        className="d-flex justify-content-start align-items-center "
                      >
                        <div>
                          <h5 style={{ marginLeft: "2vw" }}>Paket Tersedia</h5>
                        </div>
                      </Col>
                      <Col
                        md="6"
                        className="d-flex justify-content-end align-items-center"
                      >
                        <div>
                          <Form>
                            <FormGroup>
                              <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                                style={{
                                  border: "none",
                                  backgroundColor: "rgb(254,105,84)",
                                  boxShadow:
                                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                  borderRadius: "10%",
                                }}
                                innerRef={(elemen) => (this.filterIn = elemen)}
                              >
                                <option value="0">Semua Kota</option>
                                {this.state.dataKota.map((item, idx) => {
                                  return (
                                    <>
                                      <option
                                        value={() => ({ idkota: item.city_id })}
                                      >
                                        {item.city}
                                      </option>
                                    </>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Form>
                        </div>
                      </Col>
                      <Col md="12" style={{ marginLeft: "0.8vw" }}>
                        <hr style={{ border: "3px solid black" }}></hr>
                      </Col>
                    </Row>
                  </Container>

                  <Carousel responsive={this.responsive}>
                    {this.props.data.map((item, idx) => {
                      return (
                        <div
                          className="ml-5 mr-5 pt-2 pb-2"
                          style={{
                            borderRadius: "10%",
                          }}
                        >
                          {item.idstatus === 1 && (
                            <div>
                              <Card
                                style={{
                                  border: "none",
                                  boxShadow:
                                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                  borderRadius: "10%",
                                  backgroundImage: `url(${testiback1})`,
                                }}
                              >
                                <CardBody>
                                  <CardTitle
                                    tag="h5"
                                    style={{ textAlign: "center" }}
                                  >
                                    {item.kota_penerima}
                                  </CardTitle>
                                  <CardSubtitle
                                    tag="h6"
                                    className="mb-2 text-muted "
                                    style={{ textAlign: "center" }}
                                  >
                                    {item.desc_status}
                                  </CardSubtitle>
                                  <CardText style={{ textAlign: "center" }}>
                                    {`${item.berat_barang / 1000} Kg`}
                                  </CardText>
                                  <CardText style={{ textAlign: "center" }}>
                                    {item.resi}
                                  </CardText>
                                  <center>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        this.setState({
                                          isIndex: idx,
                                          modal: !this.state.modal,
                                        });
                                      }}
                                    >
                                      Ambil
                                    </Button>
                                  </center>
                                </CardBody>
                              </Card>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </Carousel>
                </Col>

                {/* CAROUSEL PAKET DIBAWA */}
                <Col md="12">
                  <h5 style={{ marginLeft: "2vw", marginTop: "3vh" }}>
                    Paket Telah Dibawa
                    <hr style={{ border: "3px solid black" }}></hr>
                  </h5>
                  <Carousel responsive={this.responsive}>
                    {this.state.dataPengiriman.map((item, idx) => {
                      return (
                        <div
                          className="ml-5 mr-5 pt-2 pb-2"
                          style={{
                            borderRadius: "10%",
                          }}
                        >
                          {item.idstatus === 1 ? (
                            <div>
                              <h4>Paket sedang diproses</h4>
                            </div>
                          ) : item.idstatus === 2 ||
                            item.idstatus === 3 ||
                            item.idstatus === 4 ||
                            (item.idstatus === 5 &&
                              this.props.idusers === item.idcourier) ? (
                            <>
                              <Card
                                style={{
                                  border: "none",
                                  boxShadow:
                                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                  borderRadius: "10%",
                                  backgroundImage: `url(${testiback})`,
                                }}
                              >
                                <CardBody>
                                  <CardTitle
                                    tag="h5"
                                    style={{ textAlign: "center" }}
                                  >
                                    {item.kota_penerima}
                                  </CardTitle>
                                  <CardSubtitle
                                    tag="h6"
                                    className="mb-2 text-muted "
                                    style={{ textAlign: "center" }}
                                  >
                                    {item.desc_status}
                                  </CardSubtitle>
                                  <CardText style={{ textAlign: "center" }}>
                                    {`${item.berat_barang / 1000} Kg`}
                                  </CardText>
                                  <CardText style={{ textAlign: "center" }}>
                                    {item.resi}
                                  </CardText>
                                </CardBody>
                              </Card>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                  </Carousel>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ packetReducers, usersReducer }) => {
  return {
    idusers: usersReducer.idusers,
    data: packetReducers.packet_list,
  };
};

export default connect(mapStateToProps)(sendComp);
