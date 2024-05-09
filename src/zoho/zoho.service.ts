import { Injectable } from '@nestjs/common';
import { CreateZohoDto } from './dto/create-zoho.dto';
import { UpdateZohoDto } from './dto/update-zoho.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ZohoService {
  constructor(private readonly configService: ConfigService) {}
  create(createZohoDto: CreateZohoDto) {
    return 'This action adds a new zoho';
  }

  findAll() {
    return `This action returns all zoho`;
  }

  async findOne() {
    const access_token = await this.refreshToken();
    console.log({ access_token });
    return access_token;
  }

  update(id: number, updateZohoDto: UpdateZohoDto) {
    return `This action updates a #${id} zoho`;
  }

  remove(id: number) {
    return `This action removes a #${id} zoho`;
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
