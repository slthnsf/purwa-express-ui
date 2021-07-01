import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button,
    Modal,
    ListGroup,
    ListGroupItem,
    Input,
    ModalBody,
    InputGroupAddon, 
    Dropdown, 
    DropdownMenu, 
    DropdownItem, 
    DropdownToggle, 
    InputGroup,
} from "reactstrap";
import user from "../../assets/img/user.png";
import item from "../../assets/img/item.png";
import search from "../../assets/img/search.png";
import background from "../../assets/img/backregister.jpg";
import { connect } from "react-redux";
import testiback1 from "../../assets/img/testiback1.gif";
import axios from "axios";
import { URL_API } from "../../helper";

const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal",
};


class HistoryComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            dataDetail: [],
            selectedIndex: null,
            openSearch: false,
            dataSearch: [],
            barangTerkirim: []
        };
    }

    componentDidMount() {
        this.handleBarangTerkirim()
    }

    handleBarangTerkirim = () => {
        axios.get(URL_API + `/admin/terkirim`)
            .then(res => {
                console.log("terkirim", res.data)
                let terkirim = res.data.length
                this.setState({ barangTerkirim: terkirim })
            }).catch(err => console.log(err))
    }

    handleSearch = () => {
        if (this.search.value == "") {
            this.setState({ openSearch: false, dataSearch: [] })
        } else if (this.search.value.includes("PWX")) {
            let dataSearch = this.props.barang.filter(item => item.resi.toLowerCase().includes(this.search.value.toLowerCase()))
            this.setState({ openSearch: dataSearch.length > 0 ? true : false, dataSearch })
        } else {
            let dataSearch = this.props.barang.filter(item => item.desc_status.toLowerCase().includes(this.search.value.toLowerCase()))
            this.setState({ openSearch: dataSearch.length > 0 ? true : false, dataSearch })
        }
    }

    printSearch = () => {
        return this.state.dataSearch.map((item, index) => {
            return <DropdownItem onClick={() => { this.setState({ selectedIndex: index, modal: !this.state.modal }) }}>
                {item.resi} : {item.desc_status}
            </DropdownItem>
        })
    }

    printHistory = () => {
        return this.props.barang.map((item, index) => {
            return (
                <Card body style={{
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                }} >
                    <Container>
                        <Row>
                            <Col md="3">
                                <CardTitle tag="h6">{item.jenis_barang}</CardTitle>
                                <CardText>{item.resi}</CardText>
                            </Col>
                            <Col md="3">
                                <CardTitle tag="h6">Tanggal Kirim</CardTitle>
                                <CardText>{item.tanggal_input}</CardText>
                            </Col>
                            <Col md="3">
                                <CardTitle tag="h6">Status Pengiriman</CardTitle>
                                {item.idstatus == 1 ? (
                                    <>
                                        <CardText>{item.desc_status}</CardText>
                                    </>
                                ) : item.idstatus == 2 ? (
                                    <>
                                        <CardText>{item.desc_status}&nbsp;
                                            {item.status[1].asal}
                                        </CardText>
                                    </>
                                ) : item.idstatus == 3 ||
                                    item.idstatus == 4 ? (
                                    <>
                                        <CardText>{item.desc_status}&nbsp;
                                            {item.status[2].tujuan}
                                        </CardText>
                                    </>
                                ) : item.idstatus == 5 ? (
                                    <>
                                        <CardText>{item.desc_status}&nbsp;
                                            {item.alamat}
                                        </CardText>
                                    </>
                                ) : (
                                    <>
                                        <CardText>{item.desc_status}&nbsp;
                                            {item.nama_penerima}
                                        </CardText>
                                    </>
                                )}
                            </Col>
                            <Col md="3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                                <Button color="warning" onClick={() => { this.setState({ selectedIndex: index, modal: !this.state.modal }) }}>
                                    Detail
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            )
        })
    }

    printDetail = () => {
        return this.props.barang.map((item, index) => {
            if (this.state.selectedIndex === index) {
                return (
                    <div>
                        <Modal size="lg" isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }} >
                            <ModalBody>
                                <hr></hr>
                                <Container>
                                    <Row>
                                        {/* SEBELAH KIRI */}
                                        <Col md="12">
                                            <Card style={{
                                                borderRadius: "15px", backgroundImage: `url(${testiback1})`,
                                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                            }} >
                                                <CardBody>
                                                    <table style={{ width: "100%" }}>
                                                        <thead>
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
                                                                Date :{item.tanggal_input}
                                                                <br></br>
                                                                <br></br>
                                                                Data Penerima
                                                            </th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Nama Pengirim : {item.nama_pengirim}
                                                                </td>
                                                                <td>
                                                                    Nama Penerima : {item.nama_penerima}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>Alamat : {item.alamat}</td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    No Telphone : {item.telp_penerima}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    Jenis Barang : {item.jenis_barang}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    Berat Barang : {item.berat_barang}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>Nomor Resi : {item.resi}</td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    Harga Pengiriman : {item.harga}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <Container fluid className="p-0">
                                                        <Row>
                                                            <Col md="12">
                                                                <b>Status</b>
                                                                {item.status.map((item, idx) => {
                                                                    return (
                                                                        <div>
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
                                                                                            {item.asal}
                                                                                        </ListGroupItem>
                                                                                    </ListGroup>
                                                                                </>
                                                                            ) : item.idstatus == 3 ||
                                                                                item.idstatus == 4 ? (
                                                                                <>
                                                                                    <ListGroup>
                                                                                        <ListGroupItem>
                                                                                            {item.desc_status}&nbsp;
                                                                                            {item.tujuan}
                                                                                        </ListGroupItem>
                                                                                    </ListGroup>
                                                                                </>
                                                                            ) : item.idstatus == 5 ? (
                                                                                <>
                                                                                    <ListGroup>
                                                                                        <ListGroupItem>
                                                                                            {item.desc_status}&nbsp;
                                                                                            {item.alamat}
                                                                                        </ListGroupItem>
                                                                                    </ListGroup>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <ListGroup>
                                                                                        <ListGroupItem>
                                                                                            {item.desc_status}&nbsp;
                                                                                            {item.nama_penerima}
                                                                                        </ListGroupItem>
                                                                                    </ListGroup>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </Col>
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
                )
            }
        })

    }

    render() {
        console.log("data state detail", this.state.dataDetail)
        return (
            <Container fluid className="p-0" style={{
                background: "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
                width: "100%", height: "100vh"
            }} >
                <Row>
                    <Col md="12 mt-3">
                        <Container>
                            <Row style={{ margin: "auto", justifyContent: "space-around" }}>
                                {this.printDetail()}
                                <h5>Admin</h5>
                                <Col md="4 mt-3 " style={{
                                    background: "white", borderRadius: "15px",
                                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                }} >
                                    <Container fluid>
                                        <Row>
                                            <Col md="4 d-flex justify-content-center align-items-center">
                                                <img src={user} width="65%" />
                                            </Col>
                                            <Col md="8 mt-2">
                                                <h6>{this.props.nama}</h6>
                                                <p style={{ color: "rgb(120,176,242)" }}>On Duty</p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>

                                {/* KOLOM 2 */}
                                <Col md="3 mt-3"
                                    style={{
                                        background: "white", borderRadius: "15px",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                    }} >
                                    <Container fluid>
                                        <Row>
                                            <Col md="4 d-flex justify-content-center align-items-center">
                                                <img src={item} width="60%" />
                                            </Col>
                                            <Col md="8 mt-2">
                                                <h6>Barang Terikirm</h6>
                                                <h5 style={{ color: "rgb(120,176,242)" }}>{this.state.barangTerkirim}</h5>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>

                                {/* KOLOM 3 */}
                                <Col md="4 mt-3"
                                    style={{
                                        background: "white", borderRadius: "15px",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                    }} >
                                    <Container fluid>
                                        <Row>
                                            <Col md="4 d-flex justify-content-center align-items-center">
                                                <img src={search} width="60%" />
                                            </Col>
                                            <Col md="8 mt-2">
                                                <h6>Search by Resi/Status</h6>
                                                <InputGroup size="sm" style={{ width: '95%' }} >
                                                    <Input onChange={this.handleSearch} innerRef={el => this.search = el} />
                                                    <InputGroupAddon addonType="append">
                                                        <Dropdown isOpen={this.state.openSearch}>
                                                            <DropdownToggle split outline size="sm" />
                                                            <DropdownMenu right>
                                                                {this.printSearch()}
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </InputGroupAddon>
                                                </InputGroup>
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
                                    {this.printHistory()}
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

const mapStateToProps = ({ packetReducers, usersReducer }) => {
    return {
        barang: packetReducers.packet_list,
        nama: usersReducer.nama
    }
}

export default connect(mapStateToProps)(HistoryComp);