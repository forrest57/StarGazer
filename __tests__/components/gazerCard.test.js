import GazerCard from '../../components/GazerCard'
import React from 'react'
import renderer from 'react-test-renderer'

const prop = 'lorem'
const imgUri = 'https://placekitten.com/200/300'
describe('<GazerCard />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<GazerCard login={prop} avatar={imgUri} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passed props', () => {
    const gazerComponent = renderer
      .create(<GazerCard login={prop} avatar={imgUri} />)
      .toJSON()
    const renderedPropText = gazerComponent.children[1].children[0]
    const renderedPropUri = gazerComponent.children[0].props.source.uri
    expect(renderedPropText).toBe(prop)
    expect(renderedPropUri).toBe(imgUri)
  })
})
