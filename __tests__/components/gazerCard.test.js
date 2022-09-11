import GazerCard from '../../components/GazerCard'
import React from 'react'
import renderer from 'react-test-renderer'

const prop = 'lorem'
const imgUri = 'https://placekitten.com/200/300'
describe('<gazerCard />', () => {
  it('renders at all', () => {
    const tree = renderer
      .create(<GazerCard login={prop} avatar={imgUri} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passed props', () => {
    const gazerComponent = renderer
      .create(<GazerCard login={prop} avatar={imgUri} />)
      .toJSON()
    expect(gazerComponent.children[1].children[0]).toBe(prop)
    expect(gazerComponent.children[0].props.source.uri).toBe(imgUri)
  })
})
