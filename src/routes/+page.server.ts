import 'dotenv/config';
import { sql } from '@vercel/postgres';

export async function load() {
    try {
        const comments = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
        return { props: { comments } };
    } catch (error) {
        console.error('Database error:', error);
        return { props: { comments: [] } }; // Return empty array in case of error
    }
}
