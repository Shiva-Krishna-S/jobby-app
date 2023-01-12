import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'
import {BiLinkExternal} from 'react-icons/bi'

import Skills from '../Skills'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobDetailsApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const data = fetchedData.job_details
      const jobDetails = {
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        lifeAtCompany: data.life_at_company,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        skills: data.skills.map(eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        })),
        title: data.title,
      }

      const similarJobsList = fetchedData.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetails,
        similarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobItemDetails = () => this.getJobDetails()

  failureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.retryJobItemDetails} className="btn" type="button">
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {jobDetails, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div>
        <li>
          <div>
            <img alt="job details company logo" src={companyLogoUrl} />
            <div>
              <h1>{title}</h1>
              <div>
                <AiFillStar />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <IoLocationSharp />
                <p>{location}</p>
              </div>

              <div>
                <IoBagRemoveSharp />
                <p>{employmentType}</p>
              </div>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>
              <p>Visit </p>
              <BiLinkExternal />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills </h1>
          <ul>
            {skills.map(eachItem => (
              <Skills skillsItem={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1>Life at Company </h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img alt="life at company" src={lifeAtCompany.image_url} />
          </div>
        </li>
        <h1>Similar Jobs </h1>
        <ul>
          {similarJobsList.map(eachItem => (
            <SimilarJobItem eachSimilarJob={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderJobDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
