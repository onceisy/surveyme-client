import { ResponseType } from '@/service/ajax';
import { reportAnswerToServer } from '@/service/question';
import { isObject } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const { body, method } = req;
  if (method !== 'POST'){ 
    return res.status(200).json({ code: 210, message: 'methodNotSupported' })
  }
  const { questionId } = body;
  if (!isObject(body) || !questionId) {
    return res.status(200).json({ code: 210, message: 'paramsError' })
  }
  try {    
    const response = await reportAnswerToServer(body);
    if (response.code === 200) {
      res.status(200).json({ code: 200, message: 'success' })
    } else {
      res.status(200).json({ code: 210, message: 'serviceError' })
    }
  } catch (error) {
    res.status(200).json({ code: 210, message: 'serviceError' })
  }
}
