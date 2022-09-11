import axios from 'axios'
import { appendRepoToHistory } from './asyncStorageManager'

const baseUrl = 'https://api.github.com/repos'

export const getGazers = async (user, repo) => {
  const res = await axios.get(`${baseUrl}/${user}/${repo}/stargazers`)
  return res
}

export const validateRequest = async (user, repo) => {
  if (user && repo) {
    try {
      const res = await getGazers(user, repo)
      await appendRepoToHistory(`${user}/${repo}`)
      return res
    } catch (err) {
      switch (err.response.status) {
        case 404:
          throw ['error', 'No repo found with the provided data']
        case 403:
          throw ['error', 'Api rate exceeded, try again later.']
        default:
          throw ['error', 'Unknown error, try again later']
      }
    }
  } else {
    throw ['error', 'empty search fields, add data first']
  }
}
