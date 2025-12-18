
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://nadrjkqcxjkjaapdnbsj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZHJqa3FjeGpramFhcGRuYnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MjQ2NjYsImV4cCI6MjA4MDUwMDY2Nn0.W-k2Pjgws2QHmv6lYzvCNPSqSquI353Q-dtbzJd2i2Y";
const supabase = createClient(supabaseUrl, supabaseKey);


module.exports = supabase;
