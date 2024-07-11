const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({ auth: 'secret_ahKhJkltlXAqn6VIr2g15YDouc7rimVcmUHuZn359hN' });

async function fetchDatabases() {
    try {
        const response = await notion.databases.list();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

fetchDatabases();