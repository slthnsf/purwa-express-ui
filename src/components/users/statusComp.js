import React from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardText,
  CardTitle,
  Modal,
  Input,
  CardBody,
  ListGroup,
  ListGroupItem,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import user from "../../assets/img/user.png";
import item from "../../assets/img/delivery.png";
import background from "../../assets/img/backregister.jpg";
import { connect } from "react-redux";
import axios from "axios";
import testiback1 from "../../assets/img/testiback1.gif";

class StatusComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trimmedDataURL: null,
      dataPengiriman: [],
      modal: false,
      modals: false,
      isIndex1: [],
      isIndex: [],
      dataStatus: [],
      dataKonfirmasi: [],
      dataAllKonfirmasi: [],
      message: "",
      color: "",
      alert: false,
    };
  }

  clear = () => {
    this.sigPad.clear();
  };
  trim = () => {
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
    });
  };

  componentDidMount() {
    this.getPengiriman();
    this.getStatusKirim();
    this.getKonfirmasi();
  }

  barangPerjalanan = () => {
    let barang = [];
    this.state.dataPengiriman.map((item, idx) => {
      if (item.idstatus !== 6 && item.idusers === this.props.idusers) {
        barang.push(idx);
      }
    });
    return barang.length;
  };

  getPengiriman = () => {
    axios
      .get("http://localhost:2000/admin/get-pengiriman")
      .then((res) => {
        this.setState({ dataPengiriman: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStatusKirim = () => {
    axios
      .get(`http://localhost:2000/admin/get-status`)
      .then((res) => {
        this.setState({ dataStatus: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onBtKonfirmasi = () => {
    if (this.state.trimmedDataURL === "") {
      this.setState({
        modals: !this.state.modals,
        message: "Input Tidak Boleh Kosong",
        color: "danger",
        alert: !this.state.alert,
      });
    } else {
      axios
        .post("http://localhost:2000/admin/add-konfirmasi", {
          idpengiriman: this.state.isIndex1.idpengiriman,
          iddata: this.state.isIndex1.iddata,
          signature: this.state.trimmedDataURL,
          penerima: this.state.isIndex1.nama_penerima,
        })
        .then((res) => {
          this.setState({
            dataKonfirmasi: res.data,
            modal: !this.state.modal,
            message: "Berhasil Konfirmasi",
            color: "success",
            alert: !this.state.alert,
          });
          setTimeout(
            () =>
              this.setState({
                modal: !this.state.modal,
              }),
            3000
          );
          this.getKonfirmasi();
          this.getPengiriman();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getKonfirmasi = () => {
    axios
      .get(`http://localhost:2000/admin/get-konfirmasi`)
      .then((res) => {
        this.setState({ dataAllKonfirmasi: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  printKonfirmasi = () => {
    let { trimmedDataURL } = this.state;
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.setState({ modal: !this.state.modal });
          }}
        >
          <ModalBody style={{ backgroundImage: `url(${testiback1})` }}>
            <div className="d-flex justify-content-between align-items-center">
              <h5>Detail</h5>
              <a
                onClick={() => {
                  this.setState({ modals: !this.state.modals });
                }}
                style={{ cursor: "pointer", fontSize: "3vh" }}
              >
                <i class="fas fa-times"></i>
              </a>
            </div>
            <Container>
              <Row>
                <Col md="6">
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Nama Penerima</Label>
                      <Input
                        type="text"
                        name="namaPenerima"
                        id="examplenamaPenerima"
                        placeholder="Masukkan Nama Penerima"
                        defaultValue={this.state.isIndex1.nama_penerima}
                        style={{ border: "none" }}
                        disabled
                      />
                    </FormGroup>
                  </Form>
                  <Label for="exampleEmail">Tanda Tangan Penerima</Label>
                  <div
                    style={{
                      border: "3px solid black",
                      width: 300,
                      height: 200,
                      borderRadius: "15px",
                    }}
                  >
                    <div className=" d-flex justify-content-center align-align-items-center">
                      <Button color="danger" onClick={this.clear}>
                        Clear
                      </Button>
                      &nbsp;
                      <Button color="primary" onClick={this.trim}>
                        Save
                      </Button>
                    </div>
                    <SignatureCanvas
                      penColor="black"
                      canvasProps={{
                        width: 300,
                        height: 165,
                        className: "sigCanvas",
                      }}
                      ref={(ref) => {
                        this.sigPad = ref;
                      }}
                    />
                  </div>

                  <div className="mt-2">
                    <Button color="success" onClick={this.onBtKonfirmasi}>
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col md="12"></Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  };

  printDetail = () => {
    return (
      <div>
        <Modal
          isOpen={this.state.modals}
          toggle={() => {
            this.setState({ modals: !this.state.modals });
          }}
          size="lg"
        >
          <ModalBody>
            <Container>
              <Row>
                <Col md="12">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Detail</h5>
                    <a
                      onClick={() => {
                        this.setState({ modals: !this.state.modals });
                      }}
                      style={{ cursor: "pointer", fontSize: "3vh" }}
                    >
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
            <hr></hr>
            <Container>
              <Row>
                {/* SEBELAH KIRI */}
                <Col md="12">
                  <Card
                    style={{
                      borderRadius: "15px",
                      backgroundImage: `url(${testiback1})`,
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <CardBody>
                      <table
                        style={{
                          // borderSpacing: "10px",
                          // borderCollapse: "separate",
                          width: "100%",
                        }}
                      >
                        <thead>
                          <th>
                            Purwa Express
                            <br></br>
                            <span
                              style={{ fontSize: "14px", fontWeight: "400" }}
                            >
                              Ekspedisi tercepat dan terpercaya
                            </span>
                            <br></br>
                            <span
                              style={{ fontSize: "14px", fontWeight: "400" }}
                            >
                              Jl. Kh Hasyim Ashari No.10000, Jakarta
                            </span>
                            <br></br>
                            <br></br>
                            Data Pengirim
                          </th>
                          <th>
                            Date :{this.state.isIndex.tanggal_input}
                            <br></br>
                            <br></br>
                            Data Penerima
                          </th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Nama Pengirim : {this.state.isIndex.nama_pengirim}
                            </td>
                            <td>
                              Nama Penerima : {this.state.isIndex.nama_penerima}
                            </td>
                          </tr>
                          <tr>
                            <td>Kota Asal : {this.state.isIndex.kota_asal}</td>
                            <td>
                              Kota Penerima : {this.state.isIndex.kota_penerima}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>Alamat : {this.state.isIndex.alamat}</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              No Telphone : {this.state.isIndex.telp_penerima}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              Jenis Barang : {this.state.isIndex.jenis_barang}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              Berat Barang : {this.state.isIndex.berat_barang}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>Nomor Resi : {this.state.isIndex.resi}</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              Harga Pengiriman : {this.state.isIndex.harga}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Container fluid className="p-0">
                        <Row>
                          <Col md="12">
                            <b>Status</b>
                            {this.state.dataStatus.map((item, idx) => {
                              return (
                                <div>
                                  {item.iddata ===
                                    this.state.isIndex.iddata && (
                                    <>
                                      {item.idstatus == 1 ? (
                                        <>
                                          <ListGroup style={{ border: "none" }}>
                                            <ListGroupItem>
                                              {item.desc_status}
                                            </ListGroupItem>
                                          </ListGroup>
                                        </>
                                      ) : item.idstatus == 2 ? (
                                        <>
                                          <ListGroup>
                                            <ListGroupItem>
                                              {item.desc_status}&nbsp;
                                              {this.state.isIndex.kota_asal}
                                            </ListGroupItem>
                                          </ListGroup>
                                        </>
                                      ) : item.idstatus == 3 ||
                                        item.idstatus == 4 ? (
                                        <>
                                          <ListGroup>
                                            <ListGroupItem>
                                              {item.desc_status}&nbsp;
                                              {this.state.isIndex.kota_penerima}
                                            </ListGroupItem>
                                          </ListGroup>
                                        </>
                                      ) : item.idstatus == 5 ? (
                                        <>
                                          <ListGroup>
                                            <ListGroupItem>
                                              {item.desc_status}&nbsp;
                                              {this.state.isIndex.alamat}
                                            </ListGroupItem>
                                          </ListGroup>
                                        </>
                                      ) : (
                                        <>
                                          <ListGroup>
                                            <ListGroupItem>
                                              {item.desc_status}&nbsp;
                                              {this.state.isIndex.nama_penerima}
                                            </ListGroupItem>
                                          </ListGroup>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </Col>
                          {this.state.isIndex.signature && (
                            <Col md="12 mt-3">
                              <b>Tanda Tangan</b>
                              <Container>
                                <Row>
                                  <Col md="12" className="mt-3">
                                    <img src={this.state.isIndex.signature} />
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                          )}
                        </Row>
                      </Container>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  };

  render() {
    let { trimmedDataURL } = this.state;
    return (
      <Container
        fluid
        style={{
          background:
            "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%",
          paddingBottom: "26%",
        }}
      >
        <Row>
          <Col md="12 mt-3">
            <Alert color={this.state.color} isOpen={this.state.alert}>
              {this.state.message}
            </Alert>
            <Container>
              <Row className="d-flex justify-content-between">
                {this.printDetail()}
                {this.printKonfirmasi()}
                <h5>User</h5>
                <Col
                  md="4 mt-3"
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <Container fluid>
                    <Row>
                      <Col md="4 d-flex justify-content-center align-items-center">
                        <img src={user} width="65%" />
                      </Col>
                      <Col md="8 mt-2">
                        <h6>{this.props.nama}</h6>
                        <p style={{ color: "rgb(120,176,242)" }}>
                          {this.props.email}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>

                {/* KOLOM 2 */}

                <Col
                  md="4 mt-3 "
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <Container fluid>
                    <Row>
                      <Col md="4 d-flex justify-content-center align-items-center">
                        <img src={item} width="60%" />
                      </Col>
                      <Col md="8 mt-2">
                        <h6>Barang Diperjalanan</h6>
                        <h3 style={{ color: "rgb(120,176,242)" }}>
                          {this.barangPerjalanan()}
                        </h3>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col md="2"></Col>
              </Row>
            </Container>

            {/* HISTORY */}
            <Container className="mt-5">
              <Row>
                <h5>Dalam Perjalanan</h5>
                <Col md="12 mt-3">
                  {this.state.dataPengiriman.map((item, idx) => {
                    return (
                      <div>
                        {item.idusers === this.props.idusers && (
                          <>
                            {item.idstatus === 6 || item.idstatus === 7 ? (
                              <></>
                            ) : (
                              <>
                                <Card
                                  body
                                  style={{
                                    borderRadius: "15px",
                                    boxShadow:
                                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    marginTop: "1vh",
                                  }}
                                >
                                  <Container>
                                    <Row>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          {item.jenis_barang}
                                        </CardTitle>
                                        <CardText>{item.resi}</CardText>
                                      </Col>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          Tanggal Diproses
                                        </CardTitle>
                                        <CardText>
                                          {item.tanggal_input}
                                        </CardText>
                                      </Col>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          Tanggal Sampai
                                        </CardTitle>
                                        <CardText>-</CardText>
                                      </Col>
                                      <Col
                                        md="3"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Button
                                          color="warning"
                                          onClick={() => {
                                            this.setState({
                                              modal: !this.state.modal,
                                            });
                                          }}
                                          disabled
                                        >
                                          Terima
                                        </Button>
                                        &nbsp;
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            this.setState({
                                              modals: !this.state.modals,
                                              isIndex: item,
                                            });
                                          }}
                                        >
                                          Detail
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Card>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </Container>
            {/* TUTUP HISTORY */}

            {/* SELESAI */}
            <Container>
              <Row>{this.printDetail()}</Row>
            </Container>

            {/* HISTORY  SELESAI*/}
            <Container className="mt-5">
              <Row>
                <h5>Barang Diterima</h5>
                <Col md="12 mt-3">
                  {this.state.dataPengiriman.map((item) => {
                    return (
                      <div>
                        {item.idusers === this.props.idusers && (
                          <>
                            {item.idstatus === 6 ? (
                              <>
                                <Card
                                  body
                                  style={{
                                    borderRadius: "15px",
                                    boxShadow:
                                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    marginTop: "1vh",
                                  }}
                                >
                                  <Container>
                                    <Row>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          {item.jenis_barang}
                                        </CardTitle>
                                        <CardText>{item.resi}</CardText>
                                      </Col>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          Tanggal Diproses
                                        </CardTitle>
                                        <CardText>
                                          {item.tanggal_input}
                                        </CardText>
                                      </Col>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          Tanggal Sampai
                                        </CardTitle>
                                        <CardText>-</CardText>
                                      </Col>
                                      <Col
                                        md="3"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Button
                                          color="warning"
                                          onClick={() => {
                                            this.setState({
                                              modal: !this.state.modal,
                                              isIndex1: item,
                                            });
                                          }}
                                        >
                                          Terima
                                        </Button>
                                        &nbsp;
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            this.setState({
                                              modals: !this.state.modals,
                                              isIndex: item,
                                            });
                                          }}
                                        >
                                          Detail
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Card>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </Container>

            {/* SELESAI KONFIRMASI */}
            <Container className="mt-5">
              <Row>
                <h5>Selesai Konfirmasi</h5>
                <Col md="12 mt-3">
                  {this.state.dataAllKonfirmasi.map((item, idx) => {
                    return (
                      <div>
                        {item.idusers === this.props.idusers && (
                          <>
                            {item.idstatus === 7 && (
                              <>
                                <Card
                                  body
                                  style={{
                                    borderRadius: "15px",
                                    boxShadow:
                                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                    marginTop: "1vh",
                                  }}
                                >
                                  <Container>
                                    <Row>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          {item.jenis_barang}
                                        </CardTitle>
                                        <CardText>{item.resi}</CardText>
                                      </Col>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          Tanggal Diproses
                                        </CardTitle>
                                        <CardText>
                                          {item.tanggal_input}
                                        </CardText>
                                      </Col>
                                      <Col md="3">
                                        <CardTitle tag="h6">
                                          Tanggal Sampai
                                        </CardTitle>
                                        <CardText>-</CardText>
                                      </Col>
                                      <Col
                                        md="3"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Button color="success" disabled>
                                          Sukses
                                        </Button>
                                        &nbsp;
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            this.setState({
                                              modals: !this.state.modals,
                                              isIndex: item,
                                            });
                                          }}
                                        >
                                          Detail
                                        </Button>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Card>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ usersReducer }) => {
  return {
    idusers: usersReducer.idusers,
    nama: usersReducer.nama,
    idrole: usersReducer.idrole,
    username: usersReducer.username,
    email: usersReducer.email,
  };
};

export default connect(mapStateToProps)(StatusComp);
