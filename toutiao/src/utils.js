/**
 * @file utils
 * @author Yuqin
 */

 /**
  * @description Network request utils
  * @param {Object} - [params] - request params
  * @returns {Promise} request promise task
  */
 export const request = params => {
  // params.methods
  let requestParams = {
    ...params,
    method: params.method && params.method.toUpperCase() || 'GET'
  }

  return fetch(requestParams.url, requestParams)
    .then(res => res.json())
 }
