import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ArtistCarousel from '../../components/carousel-stuff/ArtistCarousel';
import './LandingPageStyle.css';


const LandingPage = () => {
  const artists = [
    { id: 1, name: "Artist One", portraitUrl: "https://picsum.photos/200/300?random=1" },
    { id: 2, name: "Artist Two", portraitUrl: "https://picsum.photos/200/300?random=2" },
    { id: 3, name: "Artist Three", portraitUrl: "https://picsum.photos/200/300?random=3" },
    { id: 4, name: "Artist Four", portraitUrl: "https://picsum.photos/200/300?random=4" },
    { id: 5, name: "Artist Five", portraitUrl: "https://picsum.photos/200/300?random=5" },
    { id: 6, name: "Artist Six", portraitUrl: "https://picsum.photos/200/300?random=6" },
    { id: 7, name: "Artist Seven", portraitUrl: "https://picsum.photos/200/300?random=7" },
    { id: 8, name: "Artist Eight", portraitUrl: "https://picsum.photos/200/300?random=8" },
  ];


  return (
    <Container>
      {/* Footer */}
      <Row className="melomix-logo-banner my-4">
        <h1> MELOMIX</h1>
      </Row>

      <Row className=" my-4 d-flex align-items-stretch">
        {/* website introduction*/}
        <Col md={7} className="mb-3 d-flex">
          <Card className="listen-now-card flex-grow-1 d-flex rounded-4">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Listen to New Music</Card.Title>
              <Card.Text className="flex-grow-1">
              Elevate your playlist with MELOMIX — where music comes alive. Sign up today and tune into the rhythm of innovation and inspiration.
              </Card.Text>
              <Row>
                <Col className="text-center">
                  <Button variant="primary" size="lg">Login with Spotify </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* featured artist section with carousel */}
        <Col md={5} className="mb-3 d-flex">
          <Card className="featured-card flex-grow-1 d-flex rounded-4">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Featured Artist</Card.Title>
              <div className="flex-grow-1">
                <ArtistCarousel artists={artists} accessToken={1234} />
              </div>
              <Card.Text>
                Some text about the featured artist.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* button */}
      {/*  */}


      {/* Footer */}
      <footer className="footer mt-5 py-3 rounded-4">
        <Container>
          <Row>
            <Col md={4} className="footer-about">
              <h3>About MELOMIX</h3>
              <p>
                MELOMIX is a premier music streaming service, bringing you the best in music and connecting artists with their fans.
              </p>
            </Col>

            <Col md={4} className="footer-social">
              <h3>Follow Us</h3>
              <ul>
                <li><a href="">Facebook</a></li>
                <li><a href="">Twitter</a></li>
                <li><a href="">Instagram</a></li>
              </ul>
            </Col>

            <Col md={4} className="footer-contact">
              <h3>Contact Us</h3>
              <p>Email: support@melomix.com</p>
              <p>Phone: +123 456 7890</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
};

export default LandingPage;