import './index.css'

const Employment = props => {
  const {each, emplyedmentclicked} = props
  //   console.log(each)
  const {label, employmentTypeId} = each

  const CheckboxEmpl = () => {
    emplyedmentclicked(employmentTypeId)
  }

  return (
    <li>
      <input type="checkbox" id={employmentTypeId} onChange={CheckboxEmpl} />
      <label htmlFor={employmentTypeId} className="labelstyling">
        {label}
      </label>
    </li>
  )
}

export default Employment
