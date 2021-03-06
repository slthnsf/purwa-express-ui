import React from 'react';
import {
    Button,
    Card,
    CardText,
    CardBody,
    Modal,
    ModalBody,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import testiback1 from "../assets/img/testiback1.gif";

const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal",
};

class ModalTrackPacket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        console.log("dataTrack", this.props.dataTrack)
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.btClose}>
                    <ModalBody>
                        <Card style={{
                            borderRadius: "15px", backgroundImage: `url(${testiback1})`,
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }}>
                            {
                                this.props.dataTrack == "" ?
                                    <CardBody>
                                        <table style={{ width: "80%" }}>
                                            <thead style={thStyle}>
                                                <th>
                                                    Nomor Resi Anda Tidak Valid!
                                                </th>
                                            </thead>
                                        </table>
                                    </CardBody> :
                                    <CardBody>
                                        <table style={{ width: "80%" }}>
                                            <thead style={thStyle}>
                                                <th>
                                                    Resi: {this.props.dataTrack[0].resi}
                                                    <br></br>
                                                    Nama Penerima:
                                                    <br></br>
                                                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                                                        {this.props.dataTrack[0].nama_penerima}
                                                    </span>
                                                    <br></br>
                                                    Status:
                                                    <br></br>
                                                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                                                        {this.props.dataTrack[0].status.map((item, idx) => {
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
                                                    </span>
                                                    <br></br>
                                                    <br></br>
                                                    Purwa Express
                                                    <br></br>
                                                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                                                        Ekspedisi tercepat dan terpercaya
                                                    </span>
                                                    <br></br>
                                                    <span style={{ fontSize: "14px", fontWeight: "400" }}>
                                                        Jl. Kh Hasyim Ashari No.10000, Jakarta
                                                    </span>
                                                </th>
                                            </thead>
                                        </table>
                                    </CardBody>
                            }
                        </Card>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


export default ModalTrackPacket;