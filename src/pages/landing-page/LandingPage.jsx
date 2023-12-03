import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ArtistCarousel from "../../components/carousel-stuff/ArtistCarousel";
import "./LandingPageStyle.css";
import StarryNight from "../../components/starryNight";

const LandingPage = () => {
  //list of artist names here for the carousel
  const artists = [
    "smash mouth",
    "sublime",
    "skrillex",
    "acdc",
    "beatles",
    "drake",
  ];

  return (
    <StarryNight>
    <Container>
      {/* Footer */}
      <Row className="melomix-logo-banner my-4">
        <h1> melomix</h1>
      </Row>

      <Row className=" my-4 d-flex align-items-stretch">
        {/* website introduction*/}
        <Col md={7} className="mb-3 d-flex">
          <Card className="listen-now-card flex-grow-1 d-flex rounded-4">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Listen to New Music</Card.Title>
              <Card.Text className="flex-grow-1">
                Elevate your playlist with MELOMIX — where music comes alive.
                Sign up today and tune into the rhythm of innovation and
                inspiration.
              </Card.Text>
              {/* <Row>
                <Col className="text-center">
                  <Button variant="primary" size="lg">
                    Login with Spotify{" "}
                  </Button>
                </Col>
              </Row> */}
            </Card.Body>
          </Card>
        </Col>

        {/* featured artist section with carousel */}
        <Col md={5} className="mb-3 d-flex">
          <Card className="featured-card flex-grow-1 d-flex rounded-4">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Featured Artist</Card.Title>
              <div className="flex-grow-1">
                <ArtistCarousel artists={artists} />
              </div>
              {/* <Card.Text>Some text about the featured artist.</Card.Text> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* button */}
      {/*  */}

      {/* Footer */}
      {/* <footer className="footer mt-5 py-3 rounded-4"> NOT WORKING BUT PROBABLY SHOULD MAKE INTO ITS OWN COMPONENET
        <Container>
          <Row>
            <Col md={4} className="footer-about">
              <h3>About MELOMIX</h3>
              <p>
                MELOMIX is a premier music streaming service, bringing you the
                best in music and connecting artists with their fans.
              </p>
            </Col>

            <Col md={4} className="footer-social">
              <h3>Follow Us</h3>
              <ul>
                <li>
                  <a href="">Facebook</a>
                </li>
                <li>
                  <a href="">Twitter</a>
                </li>
                <li>
                  <a href="">Instagram</a>
                </li>
              </ul>
            </Col>

            <Col md={4} className="footer-contact">
              <h3>Contact Us</h3>
              <p>Email: support@melomix.com</p>
              <p>Phone: +123 456 7890</p>
            </Col>
          </Row>
        </Container>
      </footer> */}
    </Container>
    </StarryNight>
  );
};

export default LandingPage;
