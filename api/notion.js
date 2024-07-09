const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    
    const tasks = response.results.map(page => ({
      name: page.properties.Name.title[0].plain_text,
      'red-green': page.properties['red-green'].formula.string
    }));

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};