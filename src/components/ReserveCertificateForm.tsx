import axios, { AxiosError } from "axios";
import { GiftCertificate } from "../models/GiftCertificate";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { Message } from "./Message";
import { StatusCode } from "../models/StatusCode";
import { STATUS_MSG } from "../constants";
import { useCertificateTypes } from "../hooks/use-certificate-types";

const SERV_PATH = process.env.REACT_APP_SERV_PATH
const GET_FREE_CERTIFICATE = "reserve_certificate/";

interface ResponseReserveCertificate {
    statusCode: StatusCode
    giftCertificate?: GiftCertificate
}

export function ReserveCertificateForm() {
  const [searchFormIsValid, setSearchFormIsValid] = useState(true);
  const [searching, setSearching] = useState(false);
  const [giftCerificate, setGiftCertificate] = useState<GiftCertificate>();
  const [searchCertificateType, setSearchCertificateType] = useState('');
  const [statusCode, setStatusCode] = useState<StatusCode>(STATUS_MSG.blank)
  const {certificateTypes, statusCertificateTypes} = useCertificateTypes();

  useEffect(() => {
    setStatusCode(statusCertificateTypes)
    if(certificateTypes.length > 0)
        setSearchCertificateType(certificateTypes[0].code)
  },[certificateTypes,statusCertificateTypes])

  const searchCertificate = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setStatusCode(STATUS_MSG.blank)

    const validity = event.target as HTMLFormElement;
    if (!validity.checkValidity()) {
      // form is invalid! so we do nothing
      setSearchFormIsValid(false);
      return;
    }

    setSearchFormIsValid(true);
    setSearching(true);

    try {
        const response = await axios.get<ResponseReserveCertificate>(
            SERV_PATH +
            GET_FREE_CERTIFICATE +
            "?certificate_type=" +
            searchCertificateType
        );
        setStatusCode(response.data.statusCode)
        if (response.data.statusCode.code === 2001)
            setGiftCertificate(response.data.giftCertificate)
    } catch (e: unknown) {
      // const error = e as AxiosError;
      setStatusCode(STATUS_MSG.err_3004)
    } finally {
      setSearching(false);
    }

  };

  const clearGiftCertificate = () => {
    setGiftCertificate(undefined)
    setStatusCode(STATUS_MSG.blank)
  }

  return (
    <>
      <Form
        id="searchForm"
        className={searchFormIsValid ? "" : "was-validated"}
        noValidate
        onSubmit={searchCertificate}
      >
        <Row>
          <FormGroup>
            <Label for="certificateType" className="mr-sm-2">
              Вкажіть вид сертифіката:
            </Label>
            <InputGroup>
              <Input type="select"
                    name="cetrificateType" 
                    id="certificateType" 
                    disabled={searching || giftCerificate !== undefined}
                    onChange={(e) => { setSearchCertificateType(e.target.value) }}
                    required>
                {certificateTypes.map((type,i) => <option key={i} value={type.code}>{type.name}</option> )}
              </Input>

              <Button
                type="submit"
                disabled={searching || giftCerificate !== undefined}
                style={{ width: "8rem" }}
              >
                {searching ? (
                  <Spinner
                    color="light"
                    style={{ width: "1.3rem", height: "1.3rem" }}
                  />
                ) : (
                  "Отримати"
                )}
              </Button>
            </InputGroup>
          </FormGroup>
        </Row>
      </Form>
      <Row className="mt-4">
        <Col
          md={{
            offset: 3,
            size: 6,
          }}
          sm="12"
        >
          <Card color="success" outline className="text-center">
            <CardHeader>Номер Сертифіката</CardHeader>
            <CardBody>
              <CardTitle tag="h1" className="my-4">{giftCerificate?.number}</CardTitle>
              <Button color="danger" className={giftCerificate === undefined ? 'd-none' : ''} onClick={clearGiftCertificate}>Очистити</Button>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Message statusCode={statusCode} />
        </Col>
      </Row>
    </>
  );
}
