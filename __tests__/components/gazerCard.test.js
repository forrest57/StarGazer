import React from 'react'
import renderer from 'react-test-renderer'

// import App from '../App'
import GazerCard from '../../components/gazerCard'

describe('<gazerCard />', () => {
  it('renders at all', () => {
    const tree = renderer.create(<GazerCard text='lorem' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passed text props', () => {
    const prop = 'lorem'
    const gazerComponent = renderer.create(<GazerCard text={prop} />).toJSON()
    expect(gazerComponent.children[0].children[0]).toBe(prop)
  })
})
