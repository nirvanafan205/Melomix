import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMusic } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

import emailjs from 'emailjs-com';

const MyFooter = () => {
  // const [feedback, setFeedback] = useState('');

  // const handleFeedbackChange = (e) => {
  //   setFeedback(e.target.value);
  // };

  // const submitFeedback = (e) => {
  //   e.preventDefault();

  //   const templateParams = {
  //     // email template parameters like message body, subject, etc.
  //     feedback: feedback,
  //     // you can add more parameters like user_email, user_name, etc.
  //   };

  //   emailjs.send('your_service_id', 'your_template_id', templateParams, 'your_user_id')
  //     .then((response) => {
  //       console.log('SUCCESS!', response.status, response.text);
  //       // Here you can clear the form or give a success message
  //     }, (err) => {
  //       console.log('FAILED...', err);
  //     });
  // };
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