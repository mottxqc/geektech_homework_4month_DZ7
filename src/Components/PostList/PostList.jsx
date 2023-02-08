import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api'
import styles from './postList.module.css'

function PostList() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [userId, setUserId] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    API.get('posts').then((response) => {
      setPosts(response.data)
      setFilteredPosts(response.data)
    })
    API.get('users').then((response) => {
      setUsers(response.data)
    })
  }, [])

  useEffect(() => {
    if (userId > 0 && userId <= 10) {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.userId == userId &&
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.body.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
    } else {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm, userId])

  return (
    <div className={styles.posts_container}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите заголовок"
      />
      <select onChange={(e) => setUserId(e.target.value)}>
        <option value="0" selected>
          All
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <ul className={styles.posts}>
        {filteredPosts.map((post) => (
          <li key={post.id} className={styles.post}>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostList