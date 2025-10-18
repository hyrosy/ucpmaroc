// In src/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eaebtyjhoogzjhbzdvdy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZWJ0eWpob29nempoYnpkdmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjE4NzksImV4cCI6MjA3NjIzNzg3OX0.rc5o3CgnjzJZFtRynvF7vljMNxJD2ePVhxkyBvws7kM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)