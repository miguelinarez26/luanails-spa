import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkylyjjnrthoxbeculgk.supabase.co';
const supabaseKey = 'sb_publishable_fQfFYzKElu3VAUwXH8KVRw_BKuvsNbc';

export const supabase = createClient(supabaseUrl, supabaseKey);
