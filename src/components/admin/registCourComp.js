import React from "react";
import {
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import user from "../../assets/img/default.png";
import testiback from "../../assets/img/testiback.gif";
import testiback1 from "../../assets/img/testiback1.gif";
import Carousel from "react-multi-carousel";
import axios from "axios";
import { URL_API } from "../../helper";
import { connect } from "react-redux";
import { getCourier } from "../../actions" 

class RegsitCourComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      message: "",
      alertType: "",
      kurir: [],
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
    this.getKurir();
  }

  onBtRegisCourier = () => {
    let username = this.regisKurirUname.value;
    let nama = this.regisKurirName.value;
    let email = this.regisKurirEmail.value;
    let password = this.regisKurirPassword.value;
    let telp = this.regisKurirTelp.value;
    let idrole = 2;
    if (
      username == "" ||
      nama == "" ||
      email == "" ||
      password == "" ||
      telp == ""
    ) {
      this.setState({
        alert: !this.state.alert,
        message: "Lengkapi semua form!",
        alertType: "danger",
      });
      setTimeout(
        () =>
          this.setState({
            alert: !this.state.alert,
            message: "",
            alertType: "",
          }),
        3000
      );
    } else {
      if (email.includes("@")) {
        axios
          .get(URL_API + `/users/get?email=${email}`)
          .then((res) => {
            if (res.data.length > 0) {
              this.setState({
                alert: !this.state.alert,
                message: "Email sudah terdaftar",
                alertType: "warning",
              });
              setTimeout(
                () =>
                  this.setState({
                    alert: !this.state.alert,
                    message: "",
                    alertType: "",
                  }),
                3000
              );
              this.regisKurirUname.value = null;
              this.regisKurirName.value = null;
              this.regisKurirEmail.value = null;
              this.regisKurirPassword.value = null;
              this.regisKurirTelp.value = null;
            } else {
              axios
                .post(URL_API + `/users/addKurir`, {
                  username,
                  nama,
                  email,
                  password,
                  telp,
                  idrole,
                })
                .then((res) => {
                  this.setState({
                    alert: !this.state.alert,
                    message: "Registrasi akun Kurir sukses!",
                    alertType: "success",
                  });
                  setTimeout(
                    () =>
                      this.setState({
                        alert: !this.state.alert,
                        message: "",
                        alertType: "",
                      }),
                    3000
                  );
                  this.getKurir()
                  console.log(res.data);
                  this.regisKurirUname.value = null;
                  this.regisKurirName.value = null;
                  this.regisKurirEmail.value = null;
                  this.regisKurirPassword.value = null;
                  this.regisKurirTelp.value = null;
                })
                .catch((err) => console.log("Error Register", err));
            }
          })
          .catch((error) => console.log(error));
      } else {
        this.setState({
          alert: !this.state.alert,
          message: "Email Anda salah",
          alertType: "warning",
        });
        setTimeout(
          () =>
            this.setState({
              alert: !this.state.alert,
              message: "",
              alertType: "",
            }),
          3000
        );
        this.regisKurirUname.value = null;
        this.regisKurirName.value = null;
        this.regisKurirEmail.value = null;
        this.regisKurirPassword.value = null;
        this.regisKurirTelp.value = null;
      }
    }
  };

  getKurir = () => {
    axios
      .get(URL_API + `/users/get?idrole=2`)
      .then((res) => {
        console.log("Data Kurir", res.data);
        this.setState({ kurir: res.data });
      })
      .catch((err) => console.log("data kurir error", err));
  };

  printDataKurir = () => {
    return this.state.kurir.map((item, index) => {
      return (
        <div className="ml-5 mr-5 pt-2 pb-2" style={{ borderRadius: "10%" }}>
          <Card
            style={{
              border: "none",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              borderRadius: "10%",
              backgroundImage: `url(${testiback})`,
            }}
          >
            <img
              top
              width="30%"
              src={user}
              alt="Card image cap"
              className="m-auto rounded-circle mt-3"
              style={{ boxShadow: "3px 3px 3px 3px #ccc" }}
            />
            <CardBody>
              <CardTitle tag="h5" style={{ textAlign: "center" }}>
                {item.nama}
              </CardTitle>
              <CardSubtitle
                tag="h6"
                className="mb-2 text-muted "
                style={{ textAlign: "center" }}
              >
                courier
              </CardSubtitle>
              <CardText style={{ textAlign: "center" }}>{item.telp}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    });
  };

  render() {
    console.log("kurir", this.props.kurir )

    return (
      <Container
        fluid
        className="pt-5"
        style={{
          background:
            "linear-gradient(0deg, rgba(254,104,84,1) 0%, rgba(247,190,103,1) 100%)",
          width: "100%",
          height: "100vh",
        }}
      >
        <Row>
          {/* INPUT FORM COURIER */}
          <Col md="6" className="pl-5">
            <h5>Registrasi Courier</h5>
            <Alert isOpen={this.state.alert} color={this.state.alertType}>
              {this.state.message}
            </Alert>
            <Form style={{ marginTop: "4vh" }}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  placeholder="Masukkan Username"
                  innerRef={(e) => (this.regisKurirUname = e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Name</Label>
                <Input
                  type="text"
                  placeholder="Masukkan Nama"
                  innerRef={(e) => (this.regisKurirName = e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  placeholder="Masukkan Email"
                  innerRef={(e) => (this.regisKurirEmail = e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Telephone</Label>
                <Input
                  type="number"
                  placeholder="Masukkan Nomor Telephone"
                  innerRef={(e) => (this.regisKurirTelp = e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  placeholder="Masukkan Password"
                  innerRef={(e) => (this.regisKurirPassword = e)}
                />
              </FormGroup>
              <Button
                color="warning"
                style={{ color: "white" }}
                onClick={this.onBtRegisCourier}
              >
                Signup
              </Button>
            </Form>
          </Col>

          {/* LIST COURIER */}
          <Col md="6">
            <h5 style={{ marginLeft: "3vw", marginBottom: "5vh" }}>
              List Courier
            </h5>
            <Carousel responsive={this.responsive}>
              {this.printDataKurir()}
            </Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}



export default RegsitCourComp;
