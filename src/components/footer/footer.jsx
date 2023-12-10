import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMusic } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const MyFooter = () => {
  return (
    <footer className="footer mt-5 py-3 rounded-4">
      <Container>
        <Row>
          <Col md={8} className="footer-about">
            <h3><FontAwesomeIcon icon={faMusic} /> About MELOMIX </h3>
            <p>
              MELOMIX is a premier music streaming service, bringing you the
              best in music and connecting artists with their fans.
            </p>
          </Col>

          <Col md={4} className="footer-contact">
            <h3>Contact Us</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> Email: support@melomix.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row>
          <Col className="footer-disclaimer">
            <p className="t small">
              This site is a student project and is for educational purposes only. All content and data are hypothetical and not affiliated with any real entities. This project is not intended for commercial use and is not associated with any music streaming service.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;