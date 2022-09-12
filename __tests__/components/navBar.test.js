import { render, screen } from '@testing-library/react-native'

import NavBar from '../../components/NavBar'
import React from 'react'
import renderer from 'react-test-renderer'

describe('<Navbar/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NavBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly displays passed prop', () => {
    render(<NavBar barText={'lorem'} />)
    const barText = screen.getByText('lorem')
    const gearIcon = screen.getByTestId('GearButton')
    expect(barText).toBeTruthy()
    expect(gearIcon).toBeTruthy()
  })
  it('correctly conditionally hides the settings button', () => {
    render(<NavBar barText={'lorem'} isSettingsShown={false} />)
    let isExisting = true
    try {
      isExisting = screen.getByTestId('GearButton')
    } catch (_) {
      //missing always throws
      isExisting = false
    }
    expect(isExisting).toBe(false)
  })
})
