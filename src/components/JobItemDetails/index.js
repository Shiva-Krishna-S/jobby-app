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
    <div className="current-job-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobItemDetails = () => this.getJobDetails()

  failureView = () => (
    <div className="current-job-failure-container">
      <div className="current-job-sub-failure-container">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="current-job-failure-img"
        />
        <h1 className="no-jobs-title">Oops! Something Went Wrong</h1>
        <p className="no-jobs-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          onClick={this.retryJobItemDetails}
          className="profile-retry-btn"
          type="button"
        >
          Retry
        </button>
      </div>
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
      <div className="job-item-container">
        <div className="current-job-container">
          <div className="current-job-top-container">
            <img
              alt="job details company logo"
              src={companyLogoUrl}
              className="current-job-logo"
            />
            <div className="current-job-company-name-rating">
              <h1 className="current-job-company-name">{title}</h1>
              <div className="current-job-rating-container">
                <AiFillStar className="current-job-star-icon" />
                <p className="current-job-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="current-job-card-mid-container">
            <div className="current-job-card-location-role">
              <div className="current-job-card-location-container">
                <IoLocationSharp className="current-job-card-mid-icon" />
                <p className="current-location-name">{location}</p>
              </div>
              <div className="current-job-card-location-container">
                <IoBagRemoveSharp className="current-job-card-mid-icon" />
                <p className="current-location-name">{employmentType}</p>
              </div>
            </div>
            <p className="current-package-text">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="current-job-desc-link">
            <h1 className="current-job-card-description">Description</h1>
            <a href={companyWebsiteUrl} className="current-job-links-container">
              <p className="visit-link">Visit </p>
              <BiLinkExternal className="visit-link" />
            </a>
          </div>
          <p className="current-job-card-description-details">
            {jobDescription}
          </p>
          <h1 className="current-job-skills">Skills </h1>
          <ul className="current-job-skills-container">
            {skills.map(eachItem => (
              <Skills skillsItem={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <div className="current-job-life-at-co-container">
            <div className="current-job-life-at-co-text-container">
              <h1 className="current-job-skills">Life at Company </h1>
              <p className="current-job-card-description-details">
                {lifeAtCompany.description}
              </p>
            </div>
            <img
              alt="life at company"
              src={lifeAtCompany.image_url}
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-text">Similar Jobs </h1>
        <ul className="similar-jobs-container">
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
      <div className="jobItem-page-container">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
