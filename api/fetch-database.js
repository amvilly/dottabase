const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const databaseId = 'c6366af98d2d4851beb6586c8296588d'; // Your database ID
    try {
        const response = await notion.databases.query({ database_id: databaseId });
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching database:', error);
        res.status(500).json({ error: 'Failed to fetch database' });
    }
};
