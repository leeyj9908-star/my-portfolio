import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyytasytdqnihcduntvn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eXRhc3l0ZHFuaWhjZHVudHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NzkwMTMsImV4cCI6MjA5MDE1NTAxM30.kyxgg0KbxNHlLjiEr0Jqk9MhWYjzxgwVcWp9J0EdITw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
