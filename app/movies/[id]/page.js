// app/movies/[id]/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

export default function Movie({ params }) {
  const { id } = params
  const [movie, setMovie] = useState(null)
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [commentId, setCommentId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchMovie()
    fetchComments()
  }, [id])

  async function fetchMovie() {
    const { data, error } = await supabase.from('movies').select('*').eq('id', id).single()
    if (error) {
      console.error("Error fetching movie:", error)
    } else {
      setMovie(data)
    }
  }

  async function fetchComments() {
    const { data, error } = await supabase.from('comments').select('*').eq('movie_id', id).order('created_at', { ascending: true })
    if (error) {
      console.error("Error fetching comments:", error)
    } else {
      setComments(data || [])
    }
  }

  async function addOrUpdateComment() {
    if (editMode) {
      const { error } = await supabase.from('comments').update({ content: commentContent }).eq('id', commentId)
      if (error) {
        console.error("Error updating comment:", error)
      }
    } else {
      const { data, error } = await supabase.from('comments').insert([{ movie_id: id, content: commentContent }])
      if (error) {
        console.error("Error adding comment:", error)
      } else {
        setComments((prevComments) => [...prevComments, ...(Array.isArray(data) ? data : [data])])
      }
    }
    setCommentContent('')
    setEditMode(false)
    setCommentId(null)
    window.location.reload(); // Reload the page after adding or updating the comment
  }

  async function deleteComment(commentId) {
    const { error } = await supabase.from('comments').delete().eq('id', commentId)
    if (error) {
      console.error("Error deleting comment:", error)
    } else {
      window.location.reload(); // Reload the page after deleting the comment
    }
  }

  function editComment(comment) {
    setCommentContent(comment.content)
    setCommentId(comment.id)
    setEditMode(true)
  }

  if (!movie) return <div>Loading...</div>

  return (
    <div>
      <h1>{movie.title} ({movie.year}) - Rating: {movie.rating}</h1>
      <h2>Comments</h2>
      <input
        type="text"
        placeholder="Add a comment"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <button onClick={addOrUpdateComment}>{editMode ? "Update Comment" : "Add Comment"}</button>
      <ul>
        {comments.map((comment) => (
          comment && <li key={comment.id}>
            {comment.content}
            <button onClick={() => editComment(comment)}>Edit</button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

