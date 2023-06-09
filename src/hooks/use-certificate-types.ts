import { useEffect, useState } from "react";
import { CertificateType } from "../models/CertificateType";
import axios from "axios";
import { StatusCode } from "../models/StatusCode";
import { STATUS_MSG } from "../constants";

const SERV_PATH = process.env.REACT_APP_SERV_PATH
const TYPES_OF_CERTIFICATE = "types_of_certificate/"

interface ResponseCertificateTypes{
    statusCode: StatusCode
    certificateTypes: CertificateType[]
}

export function useCertificateTypes(){

    const [certificateTypes, setCertificateTypes] = useState<CertificateType[]>([])
    const [statusCertificateTypes, setStatusCertificateTypes] = useState<StatusCode>(STATUS_MSG.blank)


    async function fetchCertificateTypes() {
        
        try{
            const response = await axios.get<ResponseCertificateTypes>(SERV_PATH + TYPES_OF_CERTIFICATE)
            setCertificateTypes(response.data.certificateTypes)
        }catch(e: unknown){
            // const error = e as AxiosError
            setStatusCertificateTypes(STATUS_MSG.err_3004)
        }
    }

    useEffect(() => {
        fetchCertificateTypes()
    },[])

    return {certificateTypes, statusCertificateTypes}
}