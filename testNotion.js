const { Client } = require('@notionhq/client');

//if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
  //throw new Error('Missing required environment variables NOTION_API_KEY or NOTION_DATABASE_ID');
//}

// Initialize the Notion client with custom headers
const notion = new Client({
  auth: 'Bearer secret_yi4aZxCF2fro9eQIMwXm8V3aYQssPWmxcEtAlgDQ2t4',
  notionVersion: '2022-06-28', // Replace with the actual version if needed
});

module.exports = async (req, res) => {
  console.log('Received request:', req.method, req.url);
  console.log('Request headers:', req.headers);  
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Fetching data from Notion...');
    const response = await notion.databases.query({
      database_id: 'c6366af98d2d4851beb6586c8296588d', //process.env.NOTION_DATABASE_ID,
    });
    
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

fetchDatabases();