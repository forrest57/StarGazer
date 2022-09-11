import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  appendRepoToHistory,
  getRepoHistory,
  clearRepoHistory,
} from '../../sharedLogic/asyncStorageManager'

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
