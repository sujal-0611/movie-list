
// app/page.js
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [year, setYear] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [movieId, setMovieId] = useState(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    const { data, error } = await supabase.from('movies').select('*')
    if (error) {
      console.error("Error fetching movies:", error)
    } else {
      setMovies(data || [])
    }
  }

  async function addOrUpdateMovie() {
    if (editMode) {
      const { error } = await supabase.from('movies').update({ title, rating, year }).eq('id', movieId)
      if (error) {
        console.error("Error updating movie:", error)
      }
    } else {
      const { data, error } = await supabase.from('movies').insert([{ title, rating, year }])
      if (error) {
        console.error("Error adding movie:", error)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...(Array.isArray(data) ? data : [data])])
      }
    }
    setTitle('')
    setRating('')
    setYear('')
    setEditMode(false)
    setMovieId(null)
    window.location.reload(); // Reload the page after adding or updating the movie
  }

  async function deleteMovie(id) {
    try {
      const response = await fetch(`/api/movies?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }
      // Optimistically update the UI
      setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id))
    } catch (error) {
      console.error("Error deleting movie:", error)
    }
  }

  function editMovie(movie) {
    setTitle(movie.title)
    setRating(movie.rating)
    setYear(movie.year)
    setMovieId(movie.id)
    setEditMode(true)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie List</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        />
        <button
          onClick={addOrUpdateMovie}
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          {editMode ? "Update Movie" : "Add Movie"}
        </button>
      </div>
      <ul className="space-y-4">
        {movies.map((movie) => (
          movie && (
            <li key={movie.id} className="border rounded-lg p-4 flex justify-between items-center">
              <Link href={`/movies/${movie.id}`} className="text-lg font-semibold">
                {movie.title} ({movie.year}) - Rating: {movie.rating}
              </Link>
              <div className="flex space-x-2">
                <button
                  onClick={() => editMovie(movie)}
                  className="bg-yellow-500 text-white p-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
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


