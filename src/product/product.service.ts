import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ZohoService } from 'src/zoho/zoho.service';

@Injectable()
export class ProductService {
  constructor(private readonly zohoService: ZohoService) {}

  async findAll() {
    try {
      // Refresh token to get the latest access token
      const { access_token } = await this.zohoService.refreshToken();

      // Make request using Axios
      const response = await axios.get(
        'https://www.zohoapis.com/inventory/v1/items',
        {
          params: {
            organization_id: '853351323',
            // 853351323
            // 839114643 mr gabby
          },
          headers: {
            Authorization: `Zoho-oauthtoken ${access_token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }
  
  async findOne(productId: string) {
    try {
      // Refresh token to get the latest access token
      const { access_token } = await this.zohoService.refreshToken();

      // Make request using Axios
      const response = await axios.get(
        `https://www.zohoapis.com/inventory/v1/items/${productId}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${access_token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }


}
