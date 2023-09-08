import { get, post } from './ajax';
import { baseUrl } from './constant';

export async function queryQuestionInfo(id: string) {
  return await get(`${ baseUrl }api/question/detail/${ id }`)
}

export async function reportAnswerToServer(params: object) {
  return await post(`${ baseUrl }api/report`, params)
}

export async function postAnswer(params: object) {
  return await post('/api/answer', params)
}

export async function queryUserAnswer(params: object) {
  return await post('/api/queryUserAnswer', params)
}
