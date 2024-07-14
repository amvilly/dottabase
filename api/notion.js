const { Client } = require('@notionhq/client');

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing required environment variable NOTION_API_KEY');
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID || 'c6366af98d2d4851beb6586c8296588d';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  try {
    // Querying the Notion database
    console.log('Querying database...');
    const response = await notion.databases.query({
      database_id: databaseId,
      // Add filters and sorts as needed
    });

    const results = response.results.map(page => {
      return {
        id: page.id,
        name: page.properties.Name.title[0].text.content,
        redGreen: page.properties['red-green'].formula.string
      };
    });
    // Logging and sending the JSON response
    console.log('Notion response received:', JSON.stringify(results, null, 2));
    res.status(200).json(results);
  } catch (error) {
    // Handling errors
    console.error('Error in Notion API:', error);
    res.status(500).json({ error: error.message });
  }
};