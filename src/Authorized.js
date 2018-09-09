import AuthComponent from './AuthComponent'

export default class Authorized extends AuthComponent {
  constructor (props) {
    super(props.validAuthStates || [], props)
  }

  showComponent () {
    const { authState, authData, onStateChange } = this.props

    return this.props.children(authState, authData, onStateChange)
  }
}
