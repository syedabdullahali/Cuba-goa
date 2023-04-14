import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./BookingForm.css";
import axios from "axios";

function BookingSection() {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pax, setPax] = useState([]);
  const [checkIn, setCheckIn] = useState("");

  async function connect(payment_request) {
    try {
      const response = await axios.post(
        "https://cuba-goa-z4hl.onrender.com/payment",
        payment_request
      );
      console.log(response);
      return response.data;
    } catch (er) {
      console.log(er);
      return { status: false, message: er.message };
    }
  }
  useEffect(()=>{
    connect(fullname)
  })

  return (
    <>
      <nav className="nav-book-form">
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={3}>
            <h3>RESORT</h3>
          </Col>
          <Col xs={12} md={3} className="text-md-end">
            <a style={{ color: "white", textDecoration: "none" }} href="/">
              Home
            </a>
          </Col>
        </Row>
      </nav>
      <section className="booking-section">
        <Container>
          <hr />
          <Row>
            <Col>
              <h4>Guest Information</h4>
              <Form>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="guest-name">
                    Guest Name:
                  </Form.Label>
                  <Col md={9}>
                    <Row>
                      <Col md={3}>
                        <Form.Select aria-label="Title">
                          <option value="">Title</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Jn.">Jn.</option>
                          <option value="Mam.">Mam.</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Sir.">Sir.</option>
                          <option value="Sr.">Sr.</option>
                        </Form.Select>
                      </Col>
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          placeholder="Enter guest name here"
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="mobile">
                    Mobile:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control
                      type="tel"
                      placeholder="Enter mobile number"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="email">
                    Email:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control
                      type="email"
                      placeholder="Enter email address"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="address">
                    Address:
                  </Form.Label>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      required
                    />
                  </Col>
                  <Form.Label column md={1} htmlFor="zip">
                    Zip:
                  </Form.Label>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Enter zip code"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="city">
                    City:
                  </Form.Label>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      required
                    />
                  </Col>
                  <Form.Label column md={1} htmlFor="state">
                    State:
                  </Form.Label>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Enter state"
                      required
                    />
                  </Col>
                </Row>
                <hr />
                <h4>Pick Up Information</h4>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="arrival-by">
                    Arrival By:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Select aria-label="Arrival By">
                      <option value="">Please select</option>
                      <option value="Air">Air</option>
                      <option value="Car">Car</option>
                      <option value="Train">Train</option>
                      <option value="flight">Flight</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="arrival-date">
                    Arrival Date:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control type="date" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="arrival-time">
                    Arrival Time:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control type="time" />
                  </Col>
                </Row>
                {/* <Row className="mb-3">
                <Form.Label column md={3} htmlFor="flight-number">
                  Flight Number:
                </Form.Label>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    placeholder="Enter flight number or car license plate number"
                  />
                </Col>
              </Row> */}
                <hr />
                <h4>Booking Details</h4>

                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="check-in-date">
                    Check In Date:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control type="date" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="check-out-date">
                    Check Out Date:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control type="date" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="number-of-guests">
                    Number of Guests:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control type="number" min="1" max="10" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="number-of-rooms">
                    Number of Rooms:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control type="number" min="1" max="5" required />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Form.Label column md={3} htmlFor="special-requirements">
                    Special Requirements:
                  </Form.Label>
                  <Col md={9}>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter any special requirements or requests here"
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={{ span: 9, offset: 3 }}>
                    <Button
                      variant="primary"
                      type="submit"
                      className="book-sub-btn"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <div className="summary-card">
          <Card className="booking-summary">
            <Card.Body>
              <Card.Title>Booking Summary</Card.Title>
              <Card.Subtitle className="mb-3">Resort Name</Card.Subtitle>
              <Card.Text>Resort Address</Card.Text>
              <Card.Text>Phone Number: 123-456-7890</Card.Text>
              <Card.Text>Email: example@example.com</Card.Text>
              <hr />
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Check In
                    </Col>
                    <Col className="summary-text" xs={4}>
                      01/01/2024
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Check Out
                    </Col>
                    <Col className="summary-text" xs={4}>
                      01/03/2024
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Room Details
                    </Col>
                    <Col className="summary-text" xs={4}>
                      1 Room
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Pax Details
                    </Col>
                    <Col className="summary-text" xs={4}>
                      2 Adults, 1 Child
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Taxes and Fees
                    </Col>
                    <Col className="summary-text" xs={4}>
                      $50
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Price Breakdown
                    </Col>
                    <Col className="summary-text" xs={4}>
                      $250
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className="summary-text" xs={8}>
                      Total Price
                    </Col>
                    <Col className="summary-text" xs={4}>
                      $300
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <hr />
              <Form>
                <Form.Group className="mb-3" controlId="promo-code">
                  <Form.Label>Promotional Code</Form.Label>
                  <Row>
                    <Col xs={8}>
                      <Form.Control type="text" placeholder="Enter code" />
                    </Col>
                    <Col xs={4}>
                      <Button
                        variant="primary"
                        className="book-sub-btn"
                        type="submit"
                      >
                        Apply
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}

export default BookingSection;