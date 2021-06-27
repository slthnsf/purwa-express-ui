import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import testiback from "../../assets/img/testiback.gif";
import testiback1 from "../../assets/img/testiback1.gif";

const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal",
};

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("struk", this.props.dataReceipt);
    return (
      <Container style={{ marginLeft: "1vw" }}>
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
                    width: "80%",
                  }}
                >
                  <thead style={thStyle}>
                    <th>
                      Purwa Express
                      <br></br>
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        Ekspedisi tercepat dan terpercaya
                      </span>
                      <br></br>
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        Jl. Kh Hasyim Ashari No.10000, Jakarta
                      </span>
                      <br></br>
                      <br></br>
                      Data Pengirim
                    </th>
                    <th>
                      Date : {this.props.dataReceipt.tanggal_input}
                      <br></br>
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        Paket diinputkan oleh :
                      </span>
                      <br></br>
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        {this.props.admin}
                      </span>
                      <br></br>
                      <br></br>
                      Data Penerima
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Nama Pengirim : {this.props.dataReceipt.nama_pengirim}
                      </td>
                      <td>
                        Nama Penerima : {this.props.dataReceipt.nama_penerima}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Kota Asal : {this.props.dataReceipt.nama_kota_asal}
                      </td>
                      <td>
                        Kota Penerima :{" "}
                        {this.props.dataReceipt.nama_kota_penerima}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Alamat : {this.props.dataReceipt.alamat}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        No Telphone : {this.props.dataReceipt.telp_penerima}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        Jenis Barang : {this.props.dataReceipt.jenis_barang}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        Berat Barang : {this.props.dataReceipt.berat_barang}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Nomor Resi : {this.props.dataReceipt.resi}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Harga Pengiriman : {this.props.dataReceipt.harga}</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ComponentToPrint;
