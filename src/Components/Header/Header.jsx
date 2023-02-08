import { Link } from 'react-router-dom'
import styles from './header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to={"/"}>LOGO</Link>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Posts</Link>
            </li>
            <li>
              <Link to={"/add-user"}>Add user</Link>
            </li>
            <li>
              <Link to={"/users"}>Users</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header