/**
 * @file utils
 * @author Yuqin
 */
import mock from '../../server/mock.json'

 /**
  * @description Network request utils
  * @param {Object} - [params] - request params
  * @returns {Promise} request promise task
  */
 export const request = params => {
  let requestParams = {
    ...params,
    method: params.method && params.method.toUpperCase() || 'GET'
  }
  return Promise.resolve(mock)
  // return fetch(requestParams.url, requestParams)
  //   .then(res => res.json())
 }
