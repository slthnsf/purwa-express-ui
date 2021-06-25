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

class PenngirimanComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid>
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
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Masukkan Nomor Resi"
                />
                &nbsp;
                <Button
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
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Origin"
                />
                &nbsp;
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Destination"
                />
                &nbsp;
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Weight"
                />
                &nbsp;
                <Button
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

export default PenngirimanComp;
