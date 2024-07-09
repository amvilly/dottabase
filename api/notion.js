const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
//const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = async (req, res) => {
  try {
    // Your Notion API logic here
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    
    const tasks = response.results.map(page => ({
      name: page.properties.Name.title[0].plain_text,
      'red-green': page.properties['red-green'].formula.string
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};