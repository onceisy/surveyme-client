import { post } from './ajax';
import { baseUrl } from './constant';

export async function QueryOptionByIds(optionIds: string[]) {
  return await post( `${ baseUrl }api/config/options/query`, { optionIds })
}
