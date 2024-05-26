// Import necessary modules
import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

// POST method to submit comments
export const POST: RequestHandler = async ({ request }) => {
    try {
        // Parse JSON data from the request body
        const { relationship, full_name, comment } = await request.json();

        // Check if required fields are provided
        if (!relationship || !full_name || !comment) {
            return json({ error: 'All fields are required.' }, { status: 400 });
        }

        // Insert the comment into the database
        await sql`
            INSERT INTO comments (relationship, full_name, comment)
            VALUES (${relationship}, ${full_name}, ${comment});
        `;
        
        // Return success message
        return json({ message: 'Comment added successfully.' });
    } catch (error) {
        console.error('Database error:', error);

        // Return error message
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