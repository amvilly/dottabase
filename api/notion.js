const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Fetching data from Notion...');
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    console.log('Notion response received:', JSON.stringify(response, null, 2));
    
    const tasks = response.results.map(page => ({
      name: page.properties.Name.title[0].plain_text,
      'red-green': page.properties['red-green'].formula.string,
      space: page.properties.Space.select.name,
      lastCompleted: page.properties['Last completed'].date.start,
    }));

    console.log('Sending response:', JSON.stringify(tasks, null, 2));
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error in Notion API:', error);
    res.status(500).json({ error: error.message });
  }
}; 