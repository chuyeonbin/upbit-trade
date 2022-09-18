import axios from 'axios';

const BASE_URL = 'https://api.upbit.com/v1';

export async function getMarketCodes() {
  const query = '/market/all?isDetails=false';
  const response = await axios.get(BASE_URL + query);
  return response.data;
}
