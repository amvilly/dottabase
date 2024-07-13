const { Client } = require('@notionhq/client');

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing required environment variable NOTION_API_KEY');
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

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
    const { page_id, property_id } = req.body;

    if (!page_id || !property_id) {
      return res.status(400).json({ error: 'Missing required fields: page_id and property_id' });
    }

    console.log('Fetching page property from Notion...');
    const response = await notion.pages.properties.retrieve({
      page_id,
      property_id,
    });

    console.log('Notion response received:', JSON.stringify(response, null, 2));
    res.status(200).json(response);
  } catch (error) {
    console.error('Error in Notion API:', error);
    res.status(500).json({ error: error.message });
  }
};
