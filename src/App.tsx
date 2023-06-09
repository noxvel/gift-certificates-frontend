import React from 'react';
import { Container, Row, Col, Form} from 'reactstrap';
import { ReserveCertificateForm } from './components/ReserveCertificateForm';

function App() {
  return (
    <>
      <header className='text-center text-white bg-success bg-gradient py-4 mb-5'>
        <h1>Сертифікати</h1>
      </header>
      <main>
        <Container>
          <Row>
            <Col></Col>
            <Col sm="8">
              <ReserveCertificateForm />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
