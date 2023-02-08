import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../../api'
import styles from './post.module.css'

export default function Post() {
  const [postData, setPostData] = useState({})
  const [otherPosts, setOtherPosts] = useState([])
  const [comments, setComments] = useState([])
  const { postId } = useParams()

  useEffect(() => {
    API.get(`posts/${postId}`).then((response) => {
      setPostData(response.data)
    })
    API.get(`posts/${postId}/comments`).then((response) => {
      setComments(response.data)
    });
  }, [postId])

  useEffect(() => {
    API.get(`posts`).then((response) => {
      setOtherPosts(
        response.data.filter(
          (other) => other.userId == postData.userId && !(other.id == postId)
        )
      )
    })
  }, [postData, postId])

  return (
    <div className={styles.post}>
      <main>
        <article>
          <h1>{postData.title}</h1>
          <p>{postData.body}</p>
        </article>
      </main>
      <div className={styles.comments}>
        <h3>Comments:</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p className={styles.name}>{comment.name}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <aside>
        <h3>Other:</h3>
        <ul className={styles.others}>
          {otherPosts.map((other) => (
            <li key={other.id}>
              <Link to={`/post/${other.id}`}>
                <p>{other.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}