import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const baseUrl = 'https://api.github.com/repos/'

export const getGazers = async (user, repo) => {
  const res = await axios.get(`${baseUrl}${user}/${repo}/stargazers`)
  return res
}

export const validateRequest = (user, repo) => {
  if (user && repo) {
    return getGazers(user, repo)
      .then((res) => {
        appendRepoToHistory()
        return res
      })
      .catch((err) => {
        switch (err.response.status) {
          case 404:
            throw ['error', 'No repo found with the provided data']
          case 403:
            throw ['error', 'Api rate exceeded, try again later.']
          default:
            throw ['error', 'Unknown error, try again later']
        }
      })
  } else {
    throw ['error', 'empty search fields, add data first']
  }
}

export const appendRepoToHistory = async (repoString) => {
  try {
    const lowerCased = repoString.toLowerCase()
    const repoHistory = await getRepoHistory()
    if (!repoHistory.includes(lowerCased)) {
      repoHistory.unshift(lowerCased)
      const stringified = JSON.stringify(repoHistory)
      await AsyncStorage.setItem('RepoHistory', stringified)
      return true
    } else {
      return false
    }
  } catch (e) {}
}

export const getRepoHistory = async () => {
  const repoHistory = await AsyncStorage.getItem('RepoHistory')
  if (repoHistory !== null) {
    return JSON.parse(repoHistory)
  } else {
    return []
  }
}
export const clearRepoHistory = async () => {
  const successMsg = ['Success', 'Cleared repo history']
  const failMsg = ['Error', 'There was an error clearing the cache history']

  try {
    const _ = await AsyncStorage.removeItem('RepoHistory')
    return successMsg
  } catch (_) {}
  return failMsg
}
