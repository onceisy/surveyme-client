import { ResponseType, post } from '@/service/ajax';
import { baseUrl } from '@/service/constant';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const { body, method } = req;
  if (method !== 'POST'){ 
    return res.status(200).json({ code: 210, message: 'methodNotSupported' })
  }
  try {
    const response = await post(`${ baseUrl }api/report/queryUserAnswer`, body);
    return res.status(200).json(response)
  } catch (error) {
    return res.status(200).json({ code: 210, message: 'serviceError' })
  }
}
