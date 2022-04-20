const { Client } = require('@notionhq/client');

const { NOTION_KEY, NOTION_DB } = process.env;

// Initializing a client
const notion = new Client({
    auth: NOTION_KEY,
});

export async function onRequest(context) {
    // Contents of context object
    try {
        const response = await notion.databases.query({
            database_id: NOTION_DB,
            filter: {
                property: 'Status',
                select: {
                    equals: 'Live',
                },
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
};
