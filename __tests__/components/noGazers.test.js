import NoGazers from '../../components/NoGazers'
import renderer from 'react-test-renderer'

describe('<NoGazers/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoGazers />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
