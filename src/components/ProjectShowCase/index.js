import './index.css'

const ProjectShowCase = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} className="image" />
      <p className="para">{name}</p>
    </li>
  )
}

export default ProjectShowCase
