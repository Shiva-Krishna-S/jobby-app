import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    activeEmploymentIdsList: [],
    searchInput: '',
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getJobs = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmploymentIdsList,
      searchInput,
      activeSalaryRangeId,
    } = this.state

    const employmentIds = activeEmploymentIdsList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentIds}&search=${searchInput}&minimum_package=${activeSalaryRangeId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <ul className="jobs-list-container">
        {jobsList.map(job => (
          <JobCard jobData={job} key={job.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-list-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-title">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-list-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-title">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickRetryJobs}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="person-name">{name}</h1>
        <p className="person-role">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        onClick={this.onClickRetryProfile}
        className="profile-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  onClickRetryProfile = () => {
    this.getProfile()
  }

  onClickRetryJobs = () => {
    this.getJobs()
  }

  renderProfile = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.getJobs()
    }
  }

  changeEmploymentType = value => {
    const {activeEmploymentIdsList} = this.state
    if (activeEmploymentIdsList.includes(value)) {
      this.setState(
        prevState => ({
          activeEmploymentIdsList: prevState.activeEmploymentIdsList.filter(
            eachItem => eachItem !== value,
          ),
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmploymentIdsList: [
            ...prevState.activeEmploymentIdsList,
            value,
          ],
        }),
        this.getJobs,
      )
    }
  }

  changeSalaryRange = value => {
    this.setState({activeSalaryRangeId: value}, this.getJobs)
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-content-container">
        <div className="jobs-profile-filters-section">
          <div className="search-bar-container-1">
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
              className="job-search-input-bar"
            />
            <button
              type="button"
              onClick={this.onClickSearch}
              className="job-search-icon-btn"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderProfile()}
          <hr className="separator" />
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
        </div>
        <div className="jobs-right-pane-section">
          <div className="search-bar-container-2">
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
              className="job-search-input-bar"
            />
            <button
              type="button"
              onClick={this.onClickSearch}
              className="job-search-icon-btn"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
