import React from 'react'
import { Text } from 'react-native'
import renderer from 'react-test-renderer'
import AnimatedButton from '../../components/animatedButton'

const prop = 'lorem'
const textComponent = () => <Text>{prop}</Text>

describe('<animatedButtton />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<AnimatedButton Component={textComponent} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('receives passed text props', () => {
    const buttonComponent = renderer
      .create(
        <AnimatedButton
          Component={textComponent}
          pressFunction={() => console.log('ipsum')}
        />
      )
      .toJSON()
      const buttonText = buttonComponent.children[0].children[0].children[0]
      expect(buttonText).toBe(prop)
  })
})
