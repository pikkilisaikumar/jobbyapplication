import './index.css'

const Skill = prop => {
  const {each} = prop

  const {imageUrl, name} = each

  return (
    <li className="list-item-skill">
      <img src={imageUrl} alt={name} />
      <p className="skillparagraph">{name}</p>
    </li>
  )
}

export default Skill
