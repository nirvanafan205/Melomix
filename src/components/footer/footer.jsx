import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMusic } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

import emailjs from 'emailjs-com';

const MyFooter = () => {

  //modal thing to show 
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <footer className="footer mt-5 py-3 rounded-4">
        <Container>
          <Row>
            <Col md={8} className="footer-about">
              <h3><FontAwesomeIcon icon={faMusic} /> About MELOMIX </h3>
              <p>
                MELOMIX is a premier music streaming service, bringing you the
                best in music and connecting artists with their fans.
              </p>
              <p className="t small">
                This site is a student project and is for educational purposes only. All content and data are hypothetical and not affiliated with any real entities. This project is not intended for commercial use and is not associated with any music streaming service.
              </p>
            </Col>

            <Col md={4} className="footer-contact">
              <h3>Contact Us</h3>
              <p><FontAwesomeIcon icon={faEnvelope} /> Email: support@melomix.com</p>
              <p><FontAwesomeIcon icon={faPhone} /> Phone: +123 456 7890</p>
              {/* Feedback Button */}
              <Button variant="primary" onClick={toggleModal}>
                Give Feedback
              </Button>
            </Col>
          </Row>
          {/* Feedback Modal */}
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal} onHide={toggleModal}>
            <Modal.Header style={{ backgroundColor: '#151515', border: 'none' }} closeButton>
              <Modal.Title>Feedback Form</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#1c1c1c' }}>
              {/* Subject Box */}
              <Form.Group controlId="feedbackSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" />
              </Form.Group>

              {/* Text Input Box */}
              <Form.Group controlId="feedbackText">
                <Form.Label>Your Feedback</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your feedback" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#1c1c1c', border: 'none' }}>
              <Button onClick={toggleModal}>
                Close
              </Button>
              <Button >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

        </Container>
      </footer>


    </>
  );
};

export default MyFooter;