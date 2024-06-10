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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{movie.title} ({movie.year}) - Rating: {movie.rating}</h1>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Add a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        />
        <button
          onClick={addOrUpdateComment}
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          {editMode ? "Update Comment" : "Add Comment"}
        </button>
      </div>
      <ul className="space-y-4">
        {comments.map((comment) => (
          comment && (
            <li key={comment.id} className="border rounded-lg p-4 flex justify-between items-center">
              {comment.content}
              <div className="flex space-x-2">
                <button
                  onClick={() => editComment(comment)}
                  className="bg-yellow-500 text-white p-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  )
}



