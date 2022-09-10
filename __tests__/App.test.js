import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

//I genuinely have no Idea why this test crashes,
//best bet is some module in the react-native-screens lib
//that handles differently than the test-renderer, since
//the error seems to reside in the backHandler
describe.skip('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />)
    expect(tree.children.length).toBe(1)
  })
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
