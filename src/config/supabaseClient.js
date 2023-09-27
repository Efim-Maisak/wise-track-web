import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from './supabase-config';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;