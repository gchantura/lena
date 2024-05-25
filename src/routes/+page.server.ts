import 'dotenv/config';
import { sql } from '@vercel/postgres';

export async function load() {
    const comments = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
    return { props: { comments } };
}
