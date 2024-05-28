import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ZohoService {
  constructor(private readonly configService: ConfigService) {}

  async findOne() {
    const access_token = await this.refreshToken();
    console.log({ access_token });
    return access_token;
  }

  async refreshToken() {
    const refreshToken = this.configService.get<string>('REFRESH_TOKEN');
    const clientId = this.configService.get<string>('CLIENT_ID');
    const clientSecret = this.configService.get<string>('CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('REDIRECT_URI');
    const scope = this.configService.get<string>('SCOPE');

    try {
      const response = await axios.post(
        'https://accounts.zoho.com/oauth/v2/token',
        null,
        {
          params: {
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            scope: scope,
            grant_type: 'refresh_token',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error refreshing token: ${error.response.data.error}`);
    }
  }
}