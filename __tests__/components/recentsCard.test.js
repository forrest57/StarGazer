import { render, screen } from '@testing-library/react-native'

import React from 'react'
import RecentsCard from '../../components/RecentsCard'
import renderer from 'react-test-renderer'

describe('<RecentsCard />', () => {
  it('renders at all', () => {
    const tree = renderer.create(<RecentsCard text={'lorem'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders passed props', () => {
    render(<RecentsCard text={'lorem'} />)
    expect(screen.getByText('lorem')).toBeTruthy()
  })
})
