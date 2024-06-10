// app/api/comments/route.js
import { supabase } from '../../../lib/supabaseClient'

export async function GET(request) {
  const movie_id = new URL(request.url).searchParams.get('movie_id')
  const { data: comments, error } = await supabase.from('comments').select('*').eq('movie_id', movie_id).order('created_at', { ascending: true })
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(comments), { status: 200 })
}

export async function POST(request) {
  const { movie_id, content } = await request.json()
  const { data, error } = await supabase.from('comments').insert([{ movie_id, content }])
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 201 })
}

export async function PUT(request) {
  const { id, ...updates } = await request.json()
  const { data, error } = await supabase.from('comments').update(updates).eq('id', id)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}

export async function DELETE(request) {
  const { id } = new URL(request.url).searchParams
  const { data, error } = await supabase.from('comments').delete().eq('id', id)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify(data), { status: 200 })
}