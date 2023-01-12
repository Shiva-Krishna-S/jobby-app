import './index.css'

const FiltersGroup = props => {
  const renderEmploymentTypesList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachType => {
      const {changeEmploymentType} = props
      const onChangeEmploymentType = event =>
        changeEmploymentType(event.target.value)
      return (
        <li key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            value={eachType.employmentTypeId}
            id={eachType.employmentTypeId}
            name={eachType.label}
            onChange={onChangeEmploymentType}
          />
          <label htmlFor={eachType.employmentTypeId}>{eachType.label}</label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <h1>Type of Employment</h1>
      <ul>{renderEmploymentTypesList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachType => {
      const {changeSalaryRange} = props
      const onChangeSalaryRange = event => changeSalaryRange(event.target.value)
      return (
        <li key={eachType.salaryRangeId}>
          <input
            type="radio"
            value={eachType.salaryRangeId}
            id={eachType.salaryRangeId}
            name="salary"
            onChange={onChangeSalaryRange}
          />
          <label htmlFor={eachType.salaryRangeId}>{eachType.label}</label>
        </li>
      )
    })
  }
  const renderSalaryRange = () => (
    <>
      <h1>Salary Range</h1>
      <ul>{renderSalaryRangeList()}</ul>
    </>
  )

  return (
    <div>
      {renderEmploymentTypes()}
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
