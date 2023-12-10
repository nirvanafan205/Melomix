import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ArtistCarousel from "../../components/carousel-stuff/ArtistCarousel";
import "./LandingPageStyle.css";
import StarryNight from "../../components/starryNight";
import MyFooter from "../../components/footer/footer";

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
    </Container>
    <MyFooter></MyFooter>
    </StarryNight>
    
  );
};

export default LandingPage;
