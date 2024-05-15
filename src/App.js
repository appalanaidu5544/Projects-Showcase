import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProjectShowCase from './components/ProjectShowCase'
import './App.css'

//This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

// Replace your code here

class App extends Component {
  state = {data: [], ap: apStatus.initial, naidu: 'ALL'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({ap: apStatus.loading})
    const {naidu} = this.state

    const url = `https://apis.ccbp.in/ps/projects?category=${naidu}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.image_url,
      }))
      this.setState({data: updatedData, ap: apStatus.success})
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  oneBlock = event => {
    this.setState({naidu: event.target.value}, this.getData)
  }

  loadingView = () => {
    const num = 50
    return (
      // eslint-disable-next-line react/no-unknown-property
      <div className="load" testid="loader">
        <Loader type="ThreeDots" color="#00BFFF" height={num} width={num} />
      </div>
    )
  }

  successView = () => {
    const {data} = this.state
    return (
      <div className="main-container">
        <ul className="mini-container">
          {data.map(item => (
            <ProjectShowCase details={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="fail-button" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView()
      case apStatus.fail:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {naidu} = this.state
    return (
      <div>
        <nav className="nav-element">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="nav-img"
          />
        </nav>
        <div className="container">
          <ul className="selection-container">
            <select className="sel" value={naidu} onChange={this.oneBlock}>
              {categoriesList.map(each => (
                <option value={each.id} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </ul>
          {this.finalRender()}
        </div>
      </div>
    )
  }
}

export default App
