import AsyncStorage from '@react-native-async-storage/async-storage'

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
  } catch (e) {
    return false //edge case, does not seem really testable
  }
}

export const getRepoHistory = async () => {
  try {
    const repoHistory = await AsyncStorage.getItem('RepoHistory')
    if (repoHistory !== null) {
      return JSON.parse(repoHistory)
    } else {
      return []
    }
  } catch (_) {
    return failMsg //edge case, again
  }
}
export const clearRepoHistory = async () => {
  const successMsg = ['Success', 'Cleared repo history']
  const failMsg = ['Error', 'There was an error clearing the cache history']

  try {
    const _ = await AsyncStorage.removeItem('RepoHistory')
    return successMsg
  } catch (_) {
    return failMsg //edge case, once more
  }
}
