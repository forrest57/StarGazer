import { appendRepoToHistory } from './asyncStorageManager'
import axios from 'axios'

const baseUrl = 'https://api.github.com/repos'

export const getGazers = async (user, repo) => {
  const res = await axios.get(`${baseUrl}/${user}/${repo}/stargazers`)
  return res
}

export const loadNextPage = async (repoString, pageToLoad) => {
  try {
    console.log(pageToLoad)
    const res = await axios.get(
      `${baseUrl}/${repoString}/stargazers?page=${pageToLoad}`
    )
    return res
  } catch (e) {
    throw switchErrorStatus(err.response.status)
  }
}

export const validateRequest = async (user, repo) => {
  const isDataProvided = user && repo
  if (isDataProvided) {
    try {
      const res = await getGazers(user, repo)
      await appendRepoToHistory(`${user}/${repo}`)
      return res
    } catch (err) {
      throw switchErrorStatus(err.response.status)
    }
  } else {
    throw ['error', 'empty search fields, add data first']
  }
}

const switchErrorStatus = (status) => {
  switch (status) {
    case 404:
      return ['error', 'No repo found with the provided data']
    case 403:
      return ['error', 'Api rate exceeded, try again later.']
    default:
      return ['error', 'Unknown error, try again later']
  }
}