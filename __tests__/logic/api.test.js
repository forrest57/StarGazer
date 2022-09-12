import { cleanup, waitFor } from '@testing-library/react-native'
import { getGazers, validateRequest } from '../../sharedLogic/apiManager'

import { appendRepoToHistory } from '../../sharedLogic/asyncStorageManager'
import axios from 'axios'

jest.mock('axios')
jest.mock('../../sharedLogic/asyncStorageManager.js', () => ({
  appendRepoToHistory: jest.fn(),
}))

afterEach(jest.resetAllMocks)
beforeEach(cleanup)

class CustomStatusError extends Error {
  constructor(status) {
    super()
    return { response: { status: status } }
  }
}
describe('Api Call', () => {
  it('throws an error if the api rate is exceeded or the repo is not valid', async () => {
    axios.get.mockRejectedValueOnce(new Error())
    await expect(getGazers('vuejs', 'vue')).rejects.toThrow()
  })

  it('returns data if api rate is not exceeded', () => {
    axios.get.mockResolvedValueOnce({ response: { status: 200 } })
    getGazers('allGood', 'valid').then((res) => {
      expect(res.response.status).toBe(200)
    })
  })
})

describe('Data Validator', () => {
  it('appends repo to history if it exists', async () => {
    axios.get.mockResolvedValueOnce({ response: { status: 200 } })
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
      expect(e[1]).toBe('Api rate exceeded, try again later.')
    }
  })
  it('throws an alert-formatted error if the gitHub api throws 404', async () => {
    const myError = new CustomStatusError(404)
    axios.get.mockRejectedValueOnce(myError)
    try {
      const res = await validateRequest('vuejs', 'vue')
      fail(`API has not thrown, data= ${res}`)
    } catch (e) {
      expect(e[1]).toBe('No repo found with the provided data')
    }
  })
  it('throws an alert-formatted error if the gitHub api throws some other error', async () => {
    const myError = new CustomStatusError(418)
    axios.get.mockRejectedValueOnce(myError)
    try {
      const res = await validateRequest('vuejs', 'vue')
      fail(`API has not thrown, data= ${res}`)
    } catch (e) {
      expect(e[1]).toBe('Unknown error, try again later')
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
