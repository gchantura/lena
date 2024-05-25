import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

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
