import {FC} from 'react'
import {Link,useNavigate}  from 'react-router-dom'


const Header:FC=()=> {
    const navigate = useNavigate()
  return (
    <header>
        <ul> 
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </ul>
    </header>
  )
}

export default Header