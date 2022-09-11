import { waitFor } from '@testing-library/react-native'
import { getGazers, validateRequest } from '../../sharedLogic/apiManager'
import { appendRepoToHistory } from '../../sharedLogic/asyncStorageManager'
import axios from 'axios'

// const axios = jest.createMockFromModule('axios')
jest.mock('axios')
jest.mock('../../sharedLogic/asyncStorageManager.js', () => ({
  appendRepoToHistory: jest.fn(),
}))
afterEach(jest.resetAllMocks)
class CustomStatusError extends Error {
  constructor(status) {
    super()
    return { response: { status: status } }
  }
}
describe('Api Call', () => {
  axios.get.mockRejectedValueOnce(new Error())
  it('throws an error if the api rate is exceeded or the repo is not valid', async () => {
    await expect(getGazers('vuejs', 'vue')).rejects.toThrow()
  })

  axios.get.mockResolvedValueOnce({ response: { status: 200 } })
  it('returns data if api rate is not exceeded', () => {
    getGazers('allGood', 'valid')
      .then((res) => {
        // console.log(res)
        expect(res.response.status).toBe(200)
      })
      .catch((err) => {
        expect(err.response.status).toBe(403)
      })
  })
})

describe('Data Validator', () => {
  axios.get.mockResolvedValueOnce({ response: { status: 200 } })
  it('appends repo to history if it exists', async () => {
    validateRequest('allGood', 'valid')
    await waitFor(() =>
      expect(appendRepoToHistory).toHaveBeenCalledWith('allGood/valid')
    )
  })

  it('throws an alert-formatted error if the gitHub api throws 403', async () => {
    const myError = new CustomStatusError(403)
    axios.get.mockRejectedValueOnce(myError)
    try {
      const res = await validateRequest('vuejs', 'vue')
      fail(`API has not thrown, data= ${res}`)
    } catch (e) {
      expect(e[0]).toBe('error')
    }
  })
  it('throws an alert-formatted error if the gitHub api throws 404', async () => {
    const myError = new CustomStatusError(404)
    axios.get.mockRejectedValueOnce(myError)
    try {
      const res = await validateRequest('vuejs', 'vue')
      fail(`API has not thrown, data= ${res}`)
    } catch (e) {
      expect(e[0]).toBe('error')
    }
  })
  it('throws an alert-formatted error if the gitHub api throws some other error', async () => {
    const myError = new CustomStatusError(418)
    axios.get.mockRejectedValueOnce(myError)
    try {
      const res = await validateRequest('vuejs', 'vue')
      fail(`API has not thrown, data= ${res}`)
    } catch (e) {
      expect(e[0]).toBe('error')
    }
  })
  it('throws an alert-formatted error if the provided data is null', async () => {
    try {
      const _ = await validateRequest('', '')
      fail('method has not thrown')
    } catch (e) {
      expect(e).toEqual(['error', 'empty search fields, add data first'])
    }
  })
})
