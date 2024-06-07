// app/api/movies/route.js
import { supabase } from '../../../lib/supabaseClient'

export async function GET() {
  const { data: movies, error } = await supabase.from('movies').select('*')
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(movies), { status: 200 })
}

export async function POST(request) {
  const { title, rating, year } = await request.json()
  const { data, error } = await supabase.from('movies').insert([{ title, rating, year }])
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 201 })
}

export async function PUT(request) {
  const { id, ...updates } = await request.json()
  const { data, error } = await supabase.from('movies').update(updates).eq('id', id)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}

export async function DELETE(request) {
  const { id } = new URL(request.url).searchParams
  const { data, error } = await supabase.from('movies').delete().eq('id', id)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}
