const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({ auth: 'secret_yi4aZxCF2fro9eQIMwXm8V3aYQssPWmxcEtAlgDQ2t4' });

async function fetchDatabases() {
    try {
        const response = await notion.databases.list();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

fetchDatabases();