import React from 'react';
import {
  Alert
} from 'reactstrap';
import { StatusCode } from '../models/StatusCode';

function setColor(code: number) {
  if (code < 2000)
      return 'light';
  else if (code < 3000) 
      return 'success';
  else if (code < 4000)
      return 'warning';
  else if (code < 5000)
      return 'danger';
  else
      return 'light';
} 

interface MessageProps {
    statusCode: StatusCode
}

export function Message({statusCode} : MessageProps){
    return ( 
        <Alert color = { setColor(statusCode.code) }
                isOpen = { statusCode.code !== 1001 } > 
        { statusCode.msg } 
        </Alert>
    
      )
}