import React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react-native'
import NavBar from '../../components/navBar'



describe('<Navbar/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NavBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('correctly displays passed prop', async () => {
    render(<NavBar barText={'lorem'} />)
    const barText = screen.getByText('lorem')
    const gearIcon = await screen.getByTestId('GearButton')
    expect(barText).toBeTruthy()
    expect(gearIcon).toBeTruthy()
  })
  it('correctly conditionally hides the settings button', () => {
    render(<NavBar barText={'lorem'} isSettingsShown={false} />)
    let isExisting = true
    try {
      isExisting = screen.getByTestId('GearButton')
    } catch (_) {
      isExisting = false
    }
    expect(isExisting).toBe(false)
  })
})
