const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

module.exports = async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    
    const tasks = response.results.map(page => {
      const nameProperty = page.properties.Name;
      const name = nameProperty.title.length > 0 ? nameProperty.title[0].plain_text : 'Unnamed Task';
      
      const redGreenProperty = page.properties['red-green'];
      const redGreen = redGreenProperty.formula ? redGreenProperty.formula.string : 'Unknown';

      return {
        name: name,
        'red-green': redGreen
      };
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};