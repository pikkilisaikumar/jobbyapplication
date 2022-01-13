const SalaryRange = props => {
  const {eachone, salaryClickedOne} = props
  const {salaryRangeId, label} = eachone

  const onradiotrig = () => {
    salaryClickedOne(salaryRangeId)
  }

  return (
    <li>
      <input
        type="radio"
        id={salaryRangeId}
        name="radio"
        onChange={onradiotrig}
      />
      <label htmlFor={salaryRangeId} className="labelstyling">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
