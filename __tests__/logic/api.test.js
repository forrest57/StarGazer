import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'
import {
  getGazers,
  validateRequest,
  appendRepoToHistory,
  getRepoHistory,
  clearRepoHistory,
} from '../../sharedLogic'

const baseUrl = 'https://api.github.com/repos'
jest.mock('axios')

class CustomStatusError extends Error {
  constructor(status) {
    return { response: { status: status } }
    // this.response.status = status
  }
}

describe('Api Call', () => {
  it('throws an error if the api rate is exceeded or the repo is not valid', async () => {
    axios.get.mockRejectedValueOnce(new Error())
    await expect(getGazers('missing', 'err404')).rejects.toThrow()
  })

  it('returns data if api rate is not exceeded', () => {
    axios.get.mockResolvedValueOnce({ response: { status: 200 } })
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
  it('throws an alert-formatted error if the gitHub api throws', async () => {
    const myError = new CustomStatusError(403)
    axios.get.mockRejectedValueOnce(myError)
    try {
      await validateRequest('missing', 'err404')
      expect(false).toBe(true)
    } catch (e) {
      console.log(e)
      expect(e[0]).toEqual('error')
    }
  })
  it('throws an alert-formatted error if the provided data is null', async () => {
    try {
      const _ = await validateRequest('', '')
    } catch (e) {
      expect(e).toEqual(['error', 'empty search fields, add data first'])
    }
  })
})

const usedStorage = 'RepoHistory'
describe('AsyncStorage manager', () => {
  it('appends a repo to the history if it is not already present, and returns true if so', async () => {
    AsyncStorage.clear()
    const res = await appendRepoToHistory('vuejs/vue')
    expect(res).toBe(true)
    expect(AsyncStorage.setItem).toBeCalledWith(
      usedStorage,
      JSON.stringify(['vuejs/vue'])
    )
  })
  it('does not append if the repo is present, and returns false if so', async () => {
    await appendRepoToHistory('vuejs/vue')
    const res = await appendRepoToHistory('vuejs/vue')
    expect(res).toBe(false)
    const storage = await AsyncStorage.getItem(usedStorage)
    await expect(storage).not.toBe(JSON.stringify(['vuejs/vue', 'vuejs/vue']))
  })
  it('prepends new repos for ease of retrieval, and returns true as in any successful operation', async () => {
    AsyncStorage.clear()
    const vue = await appendRepoToHistory('vuejs/vue')
    const ts = await appendRepoToHistory('microsoft/typescript')
    expect(vue).toBe(true)
    expect(ts).toBe(true)
    const storage = await AsyncStorage.getItem(usedStorage)
    await expect(storage).toBe(
      JSON.stringify(['microsoft/typescript', 'vuejs/vue'])
    )
  })
  it('tries to clear the AsyncStorage, and returns an alert message that depends on the result', async () => {
    const res = await clearRepoHistory()
    expect(res).toBeInstanceOf(Array)
    expect(AsyncStorage.removeItem).toBeCalledWith(usedStorage)
  })

  it('returns an empty array if the storage is Null [GET]', async () => {
    const data = await getRepoHistory()
    expect(data).toEqual([])
    expect(AsyncStorage.getItem).toBeCalledWith(usedStorage)
  })
})
