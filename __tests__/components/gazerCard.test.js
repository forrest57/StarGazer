import React from 'react'
import renderer from 'react-test-renderer'

// import App from '../App'
import GazerCard from '../../components/gazerCard'

describe('<gazerCard />', () => {
  it('renders at all', () => {
    const tree = renderer.create(<GazerCard text='lorem' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passed props', () => {
    const prop = 'lorem'
    const imgUri = 'https://placekitten.com/200/300'
    const gazerComponent = renderer
      .create(<GazerCard login={prop} avatar={imgUri} />)
      .toJSON()
    expect(gazerComponent.children[1].children[0]).toBe(prop)
    expect(gazerComponent.children[0].props.source.uri).toBe(imgUri)
  })
})
