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
    const { error } = await supabase.from('movies').delete().eq('id', id)
    if (error) {
      console.error("Error deleting movie:", error)
    } else {
      window.location.reload(); // Reload the page after deleting the movie
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
    <div>
      <h1>Movie List</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={addOrUpdateMovie}>{editMode ? "Update Movie" : "Add Movie"}</button>
      <ul>
        {movies.map((movie) => (
          movie && <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>{movie.title} ({movie.year}) - Rating: {movie.rating}</Link>
            <button onClick={() => editMovie(movie)}>Edit</button>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
