import './index.css'

const Skills = props => {
  const {skillsItem} = props
  const {name, imageUrl} = skillsItem

  return (
    <li>
      <img alt={name} src={imageUrl} />
      <p>{name}</p>
    </li>
  )
}
export default Skills
