const { Client } = require('@notionhq/client');

// Ensure the environment variable is set
if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing required environment variable NOTION_API_KEY');
}

console.log('Notion API Key:', process.env.NOTION_API_KEY);

const notion = new Client({ auth: process.env.NOTION_API_KEY });

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this as needed for security

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Fetching data from Notion...');
    const response = await notion.databases.query({
      database_id: 'c6366af98d2d4851beb6586c8296588d',
    });
    console.log('Notion response received:', JSON.stringify(response, null, 2));
    
    if (!response.results || response.results.length === 0) {
      console.log('No results found in Notion response');
      return res.status(200).json([]);
    }
  
    const tasks = response.results.map(page => {
      if (!page.properties.Name || !page.properties.Name.title || page.properties.Name.title.length === 0) {
        console.warn('Page is missing Name property:', page.id);
        return null;
      }
      return {
        name: page.properties.Name.title[0].plain_text,
        'red-green': page.properties['red-green']?.formula?.string || 'unknown',
      };
    }).filter(task => task !== null);
  
    console.log('Sending response:', JSON.stringify(tasks, null, 2));
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error in Notion API:', error);
    res.status(500).json({ error: error.message });
  }
};
