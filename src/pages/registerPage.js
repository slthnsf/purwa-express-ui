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
  Alert
} from "reactstrap";
import logo from "../assets/img/logo.png";
import regist from "../assets/img/regist.jpg";
import background from "../assets/img/loginback.jpg";
import axios from "axios";
import { URL_API } from "../helper";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      message: '',
      alertType: ''
    };
  }

  onBtRegis = () => {
    let username = this.regisUsername.value
    let nama = this.regisNama.value
    let email = this.regisEmail.value
    let password = this.regisPassword.value
    let confirmPass = this.regisConfirmPassword.value
    let telp = this.regisTelp.value
    if (username == '' || nama == '' || email == '' || password == '' || confirmPass == '' || telp == '') {
      this.setState({ alert: !this.state.alert, message: "Lengkapi semua form!", alertType: 'danger' })
      setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '', }), 3000)
    } else {
      if (email.includes('@')) {
        axios.get(URL_API + `/users/get?email=${email}`)
          .then(res => {
            if (res.data.length > 0) {
              this.setState({ alert: !this.state.alert, message: "Email sudah terdaftar", alertType: 'warning' })
              setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
              this.regisUsername.value = null
              this.regisNama.value = null
              this.regisEmail.value = null
              this.regisPassword.value = null
              this.regisConfirmPassword.value = null
              this.regisTelp.value = null
            } else if (password !== confirmPass) {
              this.setState({ alert: !this.state.alert, message: "Password Not Match", alertType: 'warning' })
              setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
              this.regisUsername.value = null
              this.regisNama.value = null
              this.regisEmail.value = null
              this.regisPassword.value = null
              this.regisConfirmPassword.value = null
              this.regisTelp.value = null
            } else {
              axios.post(URL_API + `/users/register`, { username, nama, email, password, telp })
                .then(res => {
                  this.setState({ alert: !this.state.alert, message: "Registrasi akun sukses!", alertType: 'success' })
                  setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '', }), 3000)
                  console.log(res.data)
                  this.regisUsername.value = null
                  this.regisNama.value = null
                  this.regisEmail.value = null
                  this.regisPassword.value = null
                  this.regisConfirmPassword.value = null
                  this.regisTelp.value = null
                }).catch(err => console.log("Error Register", err))
            }
          }).catch(error => console.log(error))
      } else {
        this.setState({ alert: !this.state.alert, message: 'Email Anda salah', alertType: 'warning' })
        setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
        this.regisUsername.value = null
        this.regisNama.value = null
        this.regisEmail.value = null
        this.regisPassword.value = null
        this.regisConfirmPassword.value = null
        this.regisTelp.value = null
      }
    }
  }
  
  render() {
    return (
      <Container>
        <Row className="mt-5 " style={{ borderRadius: "15px",
        boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
          <Col md="6" className="p-0">
            <img src={regist} style={{ objectFit: "fill", borderRadius: "15px 0px 0px 15px", width: "100%", height: "100%"}} />
          </Col>
          <Col md="6"
          style={{ backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "100%", 
          backgroundRepeat: "no-repeat", marginBottom: "6%" }} >
            <img src={logo} width="30%" style={{ marginTop: "5%" }} />
            <h5 style={{ marginTop: "5%", marginBottom: "5%" }}>
              Register your account
            </h5>
            <Alert isOpen={this.state.alert} color={this.state.alertType}>
              {this.state.message}
            </Alert>
            <Form>
              <FormGroup>
                <Input type="text" placeholder="Masukkan Username" innerRef={elemen => this.regisUsername = elemen} />
              </FormGroup>
              <FormGroup>
                <Input type="text" placeholder="Masukkan Nama" innerRef={elemen => this.regisNama = elemen} />
              </FormGroup>
              <FormGroup>
                <Input type="email" placeholder="Masukkan Email" innerRef={elemen => this.regisEmail = elemen} />
              </FormGroup>
              <FormGroup>
                <Input type="password" placeholder="Masukkan Password" innerRef={elemen => this.regisPassword = elemen} />
              </FormGroup>
              <FormGroup>
                <Input type="password" placeholder="Masukkan Konfirmasi Password" innerRef={elemen => this.regisConfirmPassword = elemen} />
              </FormGroup>
              <FormGroup>
                <Input type="number" placeholder="Masukkan No.Telp" innerRef={elemen => this.regisTelp = elemen} />
              </FormGroup>
            </Form>
            <Button color="warning" className="btncustom" onClick={this.onBtRegis}
              style={{ background: "rgb(254,104,84)", color: "white", width: "100%", borderRadius: "5%" }}>
              Signup
            </Button>
            <p style={{ marginTop: "5%" }}>Forgot Password ?</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterPage;