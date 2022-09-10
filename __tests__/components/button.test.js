import React from 'react'
import renderer from 'react-test-renderer'

// import App from '../App'
import animatedButton from '../../components/animatedButton'

describe('<animatedButtton />', () => {
  it('renders at all', () => {
    const tree = renderer.create(<animatedButton text='lorem' />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('receives passed text props', () => {
    const prop = 'lorem'
    const buttonComponent = renderer
      .create(<animatedButton text={prop} />)
      .toJSON()
    expect(buttonComponent.props.text).toBe(prop)
  })
})
