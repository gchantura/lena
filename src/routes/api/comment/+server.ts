import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

// POST method to submit comments
export const POST: RequestHandler = async ({ request }) => {
    try {
        const { relationship, full_name, comment, comment_from, comment_title } = await request.json();

        if (!relationship || !full_name || !comment || !comment_from || !comment_title) {
            return json({ error: 'All fields are required.' }, { status: 400 });
        }

        await sql`
            INSERT INTO comments (relationship, full_name, comment, comment_from, comment_title)
            VALUES (${relationship}, ${full_name}, ${comment}, ${comment_from}, ${comment_title});
        `;

        return json({ message: 'Comment added successfully.' });
    } catch (error) {
        console.error('Database error:', error);
        return json({ error: 'Database error.' }, { status: 500 });
    }
};

// GET method to fetch comments
export const GET: RequestHandler = async () => {
    try {
        const comments = await sql`SELECT * FROM comments ORDER BY created_at DESC`;
        return json(comments);
    } catch (error) {
        console.error('Database error:', error);
        return json({ error: 'Database error.' }, { status: 500 });
    }
};
