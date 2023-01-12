import './index.css'

const FiltersGroup = props => {
  const renderEmploymentTypesList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachType => {
      const {changeEmploymentType} = props
      const onChangeEmploymentType = event =>
        changeEmploymentType(event.target.value)
      return (
        <li key={eachType.employmentTypeId} className="employment-list-item">
          <input
            type="checkbox"
            value={eachType.employmentTypeId}
            id={eachType.employmentTypeId}
            name={eachType.label}
            onChange={onChangeEmploymentType}
            className="employment-checkbox"
          />
          <label
            htmlFor={eachType.employmentTypeId}
            className="employment-type-item"
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <div className="employment-filter-container">
      <h1 className="employment-type-text">Type of Employment</h1>
      <ul className="employment-type-list-container">
        {renderEmploymentTypesList()}
      </ul>
    </div>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachType => {
      const {changeSalaryRange} = props
      const onChangeSalaryRange = event => changeSalaryRange(event.target.value)
      return (
        <li key={eachType.salaryRangeId} className="employment-list-item">
          <input
            type="radio"
            value={eachType.salaryRangeId}
            id={eachType.salaryRangeId}
            name="salary"
            onChange={onChangeSalaryRange}
            className="employment-checkbox"
          />
          <label
            htmlFor={eachType.salaryRangeId}
            className="employment-type-item"
          >
            {eachType.label}
          </label>
        </li>
      )
    })
  }
  const renderSalaryRange = () => (
    <div className="employment-filter-container">
      <h1 className="employment-type-text">Salary Range</h1>
      <ul className="employment-type-list-container">
        {renderSalaryRangeList()}
      </ul>
    </div>
  )

  return (
    <>
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRange()}
    </>
  )
}

export default FiltersGroup
