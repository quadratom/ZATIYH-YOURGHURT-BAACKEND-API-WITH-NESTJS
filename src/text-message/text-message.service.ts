/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TextMessageService {
  constructor(private readonly configService: ConfigService) { }


  async sendSmsWithTermii({
    message,
    receiver,
  }): Promise<any> {
    let to: string;

    if (receiver.startsWith("0")) {
      to = "234" + receiver.substring(1);
    } else {
      to = receiver
    }

    console.log({ to, key: this.configService.get<string>('TERMII_API_KEY') })
    const data = {
      to,
      from: 'zayith',
      sms: message,
      type: 'plain',
      api_key: this.configService.get<string>('TERMII_API_KEY'),
      channel: 'dnd',
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('https://api.ng.termii.com/api/sms/send', data, { headers });
      console.log(response, 'ok');
      return response.data;
    } catch (error) {
      console.log({ error })
      throw new Error(error.message);
    }
  }


  async sendSmsWithSendChamp({
    message,
    receiver,
  }): Promise<any> {

    let to: string;

    if (receiver.startsWith("0")) {
      to = "+234" + receiver.substring(1);
    } else {
      to = receiver
    }


    const data = {
      to,
      message,
      sender_name: 'Sendchamp',
      route: 'dnd',
    };

    const headers = {
      'Accept': 'application/json,text/plain,*/*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sendchamp_live_$2a$10$P04e7AiNDb1fZ3qDStTiz.nQWB64D007kL9yqR33P6Ce4NdNCJ.JW',
    };

    try {
      const response = await axios.post('https://api.sendchamp.com/api/v1/sms/send', data, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log({ 'error': error })
      throw new Error(error.message);
    }

  }

}
