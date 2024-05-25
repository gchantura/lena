import 'dotenv/config';
import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export const POST: RequestHandler = async ({ request }) => {
    const { relationship, full_name, comment } = await request.json();

    if (!relationship || !full_name || !comment) {
        return json({ error: 'All fields are required.' }, { status: 400 });
    }

    try {
        await sql`
            INSERT INTO comments (relationship, full_name, comment)
            VALUES (${relationship}, ${full_name}, ${comment});
        `;
        return json({ message: 'Comment added successfully.' });
    } catch (error) {
        console.error('Database error:', error);
        return json({ error: 'Database error.' }, { status: 500 });
    }
};
