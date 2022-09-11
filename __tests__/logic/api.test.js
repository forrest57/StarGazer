import { AxiosError } from 'axios'
import { getGazers, validateRequest } from '../../sharedLogic'

//some tests are getting skipped in order to not constantly exceed the api rate
//limit in development

describe.skip('Api Call', () => {
  it('throws an error if the api rate is not exceeded or the repo is not valid', async () => {
    await expect(getGazers('notAValidOwner', 'loremipsum!$')).rejects.toThrow(
      AxiosError
    )
  })
  it('returns data if api rate is not exceeded', () => {
    getGazers('microsoft', 'TypeScript')
      .then((res) => {
        expect(res.response.status).toBe(200)
      })
      .catch((err) => {
        expect(err.response.status).toBe(403)
      })
  })
})

describe('Data Validator', () => {
  it.skip('throws an alert-formatted error if the gitHub api throws', async () => {
    try {
      const _ = await validateRequest('notAValidOwner', 'loremipsum!$')
    } catch (e) {
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
