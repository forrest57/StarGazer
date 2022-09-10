import React from 'react'
import { Text, TextComponent } from 'react-native'
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
    expect(buttonComponent.children[0].children[0].children[0]).toBe(prop)
  })
})
