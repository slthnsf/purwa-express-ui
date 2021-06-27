import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormText,
  Alert,
} from "reactstrap";
import testiback from "../../assets/img/testiback.gif";
import testiback1 from "../../assets/img/testiback1.gif";
import ReactToPrint from "react-to-print";
import Carousel from "react-multi-carousel";
import axios from "axios";
import ComponentToPrint from "./componentToPrint";
import { connect } from "react-redux";

class KirimComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKota: [],
      dataCost: [],
      dataUser: [],
      dataReceipt: [],
      dataBarang: [],
      imgback: "",
      message: "",
      color: "success",
      isOpen: false,
      isFalse: false,
    };
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

  componentDidMount() {
    this.getKota();
    this.getUser();
    this.getDataBarang();
  }

  getDataBarang = () => {
    axios
      .get(`http://localhost:2000/admin/get-data`)
      .then((res) => {
        this.setState({ dataBarang: res.data });
        if (this.state.dataBarang.length / 2 === 0) {
          {
            this.setState({ imgback: testiback1 });
          }
        } else {
          this.setState({ imgback: testiback });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDate = () => {
    let date;
    var d = new Date();
    return (date =
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      "-" +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds());
  };

  getUser = () => {
    axios
      .get(`http://localhost:2000/users/usersRole`)
      .then((res) => {
        this.setState({ dataUser: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUser = () => {
    return this.state.dataUser.map((item) => {
      return item;
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

  findCost = () => {
    // console.log("origin", this.kotaAsalIn.value);
    // console.log("destination", this.kotaPenerimaIn.value);
    // console.log("weight", this.weightIn.value);
    axios
      .post(`http://localhost:2000/ongkir/cost`, {
        origin: this.kotaAsalIn.value,
        destination: this.kotaPenerimaIn.value,
        weight: this.beratBarangIn.value,
      })
      .then((res) => {
        this.setState({ dataCost: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPrice = () => {
    return this.state.dataCost.map((item) => {
      return item.cost.map((item) => {
        return item.value;
      });
    });
  };

  generateResi = () => {
    let timestamp;
    var d = new Date().getUTCMilliseconds();
    var now = new Date();
    timestamp = (now.getMonth < 9 ? "0" : "") + now.getMonth().toString();
    timestamp += (now.getDate < 10 ? "0" : "") + now.getDate().toString();
    return "PWX#" + timestamp + d;
  };

  onBtInputPengiriman = () => {
    if (
      this.jenisBarangIn.value == "" ||
      this.namaPengirimIn.value == "" ||
      this.usernameIn.value == "" ||
      this.namaPenerimaIn.value == "" ||
      this.alamatIn.value == "" ||
      this.kotaAsalIn.value == "" ||
      this.beratBarangIn.value == "" ||
      this.hargaIn.value == "" ||
      this.telephonepenerimaIn.value == ""
    ) {
      this.setState({
        message: "Input Tidak Boleh Kosong!",
        color: "danger",
        isOpen: true,
      });
    } else {
      axios
        .post(`http://localhost:2000/admin/add-data`, {
          jenisbarang: this.jenisBarangIn.value,
          namapengirim: this.namaPengirimIn.value,
          username: parseInt(this.usernameIn.value),
          namapenerima: this.namaPenerimaIn.value,
          alamat: this.alamatIn.value,
          kotaasal: parseInt(this.kotaAsalIn.value),
          kotapenerima: parseInt(this.kotaPenerimaIn.value),
          beratbarang: parseInt(this.beratBarangIn.value),
          harga: parseInt(this.hargaIn.value),
          telephonepenerima: parseInt(this.telephonepenerimaIn.value),
          resi: this.generateResi(),
          tanggalinput: this.getDate(),
          idstatus: 1,
        })
        .then((res) => {
          this.jenisBarangIn.value = null;
          this.namaPengirimIn.value = null;
          this.usernameIn.value = null;
          this.namaPenerimaIn.value = null;
          this.alamatIn.value = null;
          this.kotaAsalIn.value = null;
          this.kotaPenerimaIn.value = null;
          this.beratBarangIn.value = null;
          this.hargaIn.value = null;
          this.telephonepenerimaIn.value = null;
          this.setState({
            message: "Selamat! , Input Pengiriman Berhasil",
            color: "success",
            isOpen: true,
            dataReceipt: res.data,
            isFalse: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    // console.log("data kota", this.state.dataKota);
    // console.log("data cost", this.state.dataCost);
    // console.log("data price", this.getPrice()[1]);
    // console.log("user", this.handleUser());
    console.log(
      "resi",
      this.generateResi().slice(0, 11) + `${Math.floor(Math.random() * 9)}`
    );
    // console.log("date", this.getDate());
    console.log("data barang", this.state.dataBarang);
    return (
      <Container
        fluid
        className="pt-5"
        style={{
          background:
            "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%",
        }}
      >
        <Row style={{ paddingBottom: "13vh" }}>
          {/* INPUT FORM COURIER */}
          <Col md="6" className="pl-5">
            <h5>
              Pengiriman Barang<hr style={{ border: "3px solid black" }}></hr>
            </h5>

            <Form style={{ marginTop: "4vh" }}>
              <FormGroup>
                <Label for="jenisBarang">Jenis Barang</Label>
                <Input
                  type="text"
                  name="namabarang"
                  id="exampleNamaBarang"
                  placeholder="Masukkan Jenis Barang"
                  innerRef={(elemen) => (this.jenisBarangIn = elemen)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="namaPengirim">Nama Pengirim</Label>
                <Input
                  type="text"
                  name="nama"
                  id="exampleNamaPengirim"
                  placeholder="Masukkan Nama Pengirim"
                  innerRef={(elemen) => (this.namaPengirimIn = elemen)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="select"
                  name="usernamePengirim"
                  id="exampleUsernamePengirim"
                  innerRef={(elemen) => (this.usernameIn = elemen)}
                >
                  <option value="0">Tidak Memiliki Akun</option>
                  {this.state.dataUser.map((item, idx) => {
                    return (
                      <>
                        <option value={item.idusers}>{item.username}</option>
                      </>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="username">Nama Penerima</Label>
                <Input
                  type="text"
                  name="nama"
                  id="exampleNamaPenerima"
                  placeholder="Masukkan Nama Penerima"
                  innerRef={(elemen) => (this.namaPenerimaIn = elemen)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Alamat</Label>
                <Input
                  type="textarea"
                  name="alamat"
                  id="exampleAlamat"
                  placeholder="Masukkan Alamat"
                  innerRef={(elemen) => (this.alamatIn = elemen)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Kota Asal</Label>
                <Input
                  type="select"
                  name="kotaAsal"
                  id="exampleKotaAsal"
                  innerRef={(elemen) => (this.kotaAsalIn = elemen)}
                  onChange={this.findCost}
                >
                  {this.state.dataKota.map((item, idx) => {
                    return (
                      <>
                        <option value={item.id}>{item.city}</option>
                      </>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Kota Penerima</Label>
                <Input
                  type="select"
                  name="kotaAsal"
                  id="exampleKotaAsal"
                  innerRef={(elemen) => (this.kotaPenerimaIn = elemen)}
                  onChange={this.findCost}
                >
                  {this.state.dataKota.map((item, idx) => {
                    return (
                      <>
                        <option value={item.id}>{item.city}</option>
                      </>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="weight">Berat Barang</Label>
                <Input
                  type="number"
                  name="beratBarang"
                  id="exampleBeratBarang"
                  placeholder="Masukkan Berat dalam gram"
                  innerRef={(elemen) => (this.beratBarangIn = elemen)}
                  onChange={this.findCost}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Harga</Label>
                <Input
                  type="number"
                  name="harga"
                  id="exampleHarga"
                  placeholder="Pilih Kota Dan Berat Barang"
                  defaultValue={this.getPrice()[1]}
                  disabled
                  innerRef={(elemen) => (this.hargaIn = elemen)}
                />
                <FormText>
                  *Harga auto generate berdasarkan pilihan lokasi dan berat
                  barang
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for="username">Telphone Penerima</Label>
                <Input
                  type="number"
                  name="telphonePenerima"
                  id="exampleTelphonePenerima"
                  placeholder="Masukkan Telphone Penerima"
                  innerRef={(elemen) => (this.telephonepenerimaIn = elemen)}
                />
              </FormGroup>
              <Alert color={this.state.color} isOpen={this.state.isOpen}>
                {this.state.message}
              </Alert>
              <Button
                color="warning"
                style={{ color: "white" }}
                onClick={this.onBtInputPengiriman}
              >
                Submit
              </Button>
            </Form>
          </Col>

          {/* LIST COURIER */}
          <Col md="6">
            <h5 style={{ marginLeft: "2vw", marginBottom: "5vh" }}>
              Menunggu Courier<hr style={{ border: "3px solid black" }}></hr>
            </h5>
            <Carousel responsive={this.responsive}>
              {this.state.dataBarang.map((item, idx) => {
                return (
                  <div
                    className="ml-5 mr-5 pt-2 pb-2"
                    style={{
                      borderRadius: "10%",
                    }}
                  >
                    {item.desc_status !== "Paket diproses" ||
                    this.state.dataBarang.length === 0 ? (
                      <div>
                        <h4>Tidak ada paket yang diproses</h4>
                      </div>
                    ) : (
                      <>
                        <Card
                          style={{
                            border: "none",
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            borderRadius: "10%",
                            backgroundImage: `url(${this.state.imgback})`,
                          }}
                        >
                          <CardBody>
                            <CardTitle
                              tag="h5"
                              style={{ textAlign: "center" }}
                            ></CardTitle>
                            <CardSubtitle
                              tag="h6"
                              className="mb-2 text-muted "
                              style={{ textAlign: "center" }}
                            >
                              {item.desc_status}
                            </CardSubtitle>
                            <CardText style={{ textAlign: "center" }}>
                              {item.resi}
                            </CardText>
                          </CardBody>
                        </Card>
                      </>
                    )}
                  </div>
                );
              })}
            </Carousel>
            {/* RECEIPT DETAILS */}

            <h5 style={{ marginLeft: "2.5vw", marginTop: "5vh" }}>
              Receipt Details<hr style={{ border: "3px solid black" }}></hr>
            </h5>

            <div style={{ marginTop: "5vh" }}>
              <ComponentToPrint
                ref={(el) => (this.componentRef = el)}
                admin={this.props.username}
                dataReceipt={this.state.dataReceipt}
              />
              <hr
                style={{
                  border: "3px solid black",
                  marginLeft: "2vw",
                  marginTop: "6vh",
                }}
              ></hr>
              {this.state.isFalse == true ? (
                <ReactToPrint
                  trigger={() => (
                    <Button
                      color="success"
                      style={{ marginLeft: "2vw", marginTop: "1vh" }}
                    >
                      Print
                    </Button>
                  )}
                  content={() => this.componentRef}
                />
              ) : (
                <>
                  <p style={{ color: "white", marginLeft: "2vw" }}>
                    *Tidak bisa melakukan print, karena anda belum Input data
                  </p>
                </>
              )}
            </div>

            {/* END RECEIPT DETAILS */}
          </Col>
          {/* END WAITING PICK */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ usersReducer }) => {
  return {
    idusers: usersReducer.idusers,
    idrole: usersReducer.idrole,
    username: usersReducer.username,
  };
};

export default connect(mapStateToProps)(KirimComp);
