const { Client } = require('@notionhq/client');

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing required environment variable NOTION_API_KEY');
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID || '3c7f9524d0b4437a9f2dbe34eafb9d6a';

module.exports = async (req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  try {
    // Set no-cache headers
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    // Querying the Notion database
    console.log('Querying database...');
    const response = await notion.databases.query({
      database_id: databaseId,
      // Add filters and sorts as needed
    });

    const results = response.results.map(page => {
      const names = page.properties.Names.rich_text.length > 0 
        ? page.properties.Names.rich_text[0].plain_text 
        : "No names";
      const redGreen = page.properties['red-green'].formula.string;
      
      return {
        names,
        redGreen,
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
