import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import ModalTrackPacket from './modalTrackPacket'
import { connect } from 'react-redux'
import axios from "axios";
import ModalTarifComp from "./modalTarifComp";
import { URL_API } from "../helper" 


class PenngirimanComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dataTrack: [],
      dataCost: [],
      modalTarif: false,
      dataKota: [],
      dataTarif: []
    };
  }

  componentDidMount() {
    this.getKota()
  }

  onBtTrack = () => {
    if (this.track.value == "") {
      this.setState({ modal: !this.state.modal, dataTrack: [] })
    } else {
      let dataTrack = this.props.barang.filter(item => item.resi.toLowerCase().includes(this.track.value.toLowerCase()))
      console.log("DATA TRACK", dataTrack)
      this.setState({ modal: !this.state.modal, dataTrack: dataTrack })
    }
  }

  getKota = () => {
    axios
      .get(URL_API+ `/ongkir/getCity`)
      .then((res) => {
        console.log("KOTA", res.data)
        this.setState({ dataKota: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findCost = () => {
    console.log("origin", this.kotaAsalIn.value);
    console.log("destination", this.kotaPenerimaIn.value);
    console.log("weight", this.beratBarangIn.value);
    axios
      .post(URL_API + `/ongkir/cost`, {
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

  onBtTarif = () => {
    let tarif = this.getPrice()
    let tarif1 = tarif[1]
    // let tarif2 = tarif1.toString()
    // console.log(tarif2)
    console.log(tarif)
    this.setState({ dataTarif: tarif })
    console.log("cek data tarif di state", this.state.dataTarif )
    this.setState({ modalTarif: !this.state.modalTarif })
  }


  render() {
    return (
      <Container fluid>
        <ModalTrackPacket modal={this.state.modal} dataTrack={this.state.dataTrack}
          btClose={() => this.setState({ modal: !this.state.modal })} />
        <ModalTarifComp modal={this.state.modalTarif} dataTarif={this.state.dataTarif}
          btClose={() => this.setState({ modalTarif: !this.state.modalTarif })} />
        <Row>
          <Col
            md="4"
            style={{
              background: "rgb(254,104,84)",
              boxShadow: "0px 5px 5px 0px #ccc",
            }}
          >
            <Form>
              <Label
                for="exampleEmail"
                style={{
                  fontSize: "5vh",
                  fontWeight: "bolder",
                  color: "white",
                  textShadow: "2px 2px 5px #ccc",
                }}
              >
                LACAK KIRIMAN
              </Label>
              <FormGroup className="d-flex">
                <Input
                  innerRef={el => this.track = el}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Masukkan Nomor Resi"
                />
                &nbsp;
                <Button
                  onClick={() => this.onBtTrack()}
                  color="warning"
                  style={{
                    background: "rgb(247,190,103)",
                    color: "white",
                    fontWeight: "bolder",
                    textShadow: "2px 2px 5px #ccc",
                  }}
                >
                  TRACK
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col
            md="4"
            style={{ background: "white", boxShadow: "0px 5px 5px 0px #ccc" }}
          >
            <Form>
              <Label
                for="exampleEmail"
                style={{
                  fontSize: "5vh",
                  fontWeight: "bolder",
                  color: "rgb(254,104,83)",
                  textShadow: "2px 2px 5px #ccc",
                }}
              >
                TARIF KIRIMAN
              </Label>
              <FormGroup className="d-flex">
                <Input
                  innerRef={el => this.kotaAsalIn = el}
                  onChange={this.findCost}
                  type="select"
                  placeholder="Origin"
                >
                  {this.state.dataKota.map((item, idx) => {
                    return (
                      <>
                        <option value={item.id}>{item.city}</option>
                      </>
                    );
                  })}
                </Input>
                &nbsp;
                <Input
                  innerRef={el => this.kotaPenerimaIn = el}
                  onChange={this.findCost}
                  type="select"
                  placeholder="Destination"
                >
                  {this.state.dataKota.map((item, idx) => {
                    return (
                      <>
                        <option value={item.id}>{item.city}</option>
                      </>
                    );
                  })}
                </Input>
                &nbsp;
                <Input
                  onChange={this.findCost}
                  innerRef={el => this.beratBarangIn = el}
                  type="number"
                  placeholder="Weight"
                />
                &nbsp;
                <Button
                  onClick={() => this.onBtTarif()}
                  color="warning"
                  style={{
                    background: "rgb(254,104,84)",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  CHECK
                </Button>

              </FormGroup>
            </Form>
          </Col>
          <Col
            md="4"
            style={{
              background: "rgb(246,193,113)",
              boxShadow: "0px 5px 5px 0px #ccc",
            }}
          >
            <Form>
              <Label
                for="exampleEmail"
                style={{
                  fontSize: "5vh",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                TITIK LAYANAN
              </Label>
              <FormGroup className="d-flex">
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Masukkan Nomor Resi"
                />
                &nbsp;
                <Button
                  color="success"
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  FIND
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ packetReducers }) => {
  return {
    barang: packetReducers.packet_list
  }
}

export default connect(mapStateToProps)(PenngirimanComp);
