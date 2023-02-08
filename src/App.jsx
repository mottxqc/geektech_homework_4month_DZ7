import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Posts from './pages/pagePosts'
import AddUser from './pages/pageAddUser'
import Users from './pages/pageUsers'
import Post from './pages/pagePost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App