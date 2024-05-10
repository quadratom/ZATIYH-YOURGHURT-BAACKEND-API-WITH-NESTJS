import { Injectable, } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
import axios from 'axios';


@Injectable()
export class ZohoService {
  constructor() {}

  async getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
    const requestBody = {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    };

    try {
      const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', requestBody);
      return response.data.access_token;
    } catch (error) {
      throw new Error('Failed to get access token from Zoho: ' + error.response.data.error_description);
    }
  }
}





// async getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
//   try {
//     const response = await this.httpService.post(
//       'https://accounts.zoho.com/oauth/v2/token',
//       {
//         client_id: clientId,
//         client_secret: clientSecret,
//         refresh_token: refreshToken,
//         grant_type: 'refresh_token',
//       },
//     ).toPromise();
//     return response.data.access_token;
//   } catch (error) {
//     throw new Error(`Failed to get access token from Zoho: ${error.response.data.error_description}`);
//   }
// }
