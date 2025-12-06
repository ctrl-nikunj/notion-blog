import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { cache } from 'react'
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export interface BlogWithSlug {
    id: string;
    title: string;
    slug: string;
    date: string | undefined;
    cover: string;
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = cache(async (): Promise<BlogWithSlug[]> => {
    const databaseId = process.env.NOTION_DATABASE_ID!;

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: "Status",
            status: { equals: "Published" },
        },
        sorts: [{ property: "Published Date", direction: "descending" }],
    });

    return response.results.map((page: any) => ({
        id: page.id,
        title: page.properties.Title?.title[0]?.plain_text ?? "Untitled",
        slug: page.properties.Slug?.rich_text[0]?.plain_text ?? page.id,
        date: page.properties["Published Date"]?.date?.start ?? undefined,
        cover: page.cover?.external?.url ?? "",
    }));
});

export const getPostBySlug = cache(async (slug: string) => {
    const databaseId = process.env.NOTION_DATABASE_ID!;

    // Check if slug is a valid UUID (Notion Page ID)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    let page;
    if (isUUID) {
        page = await notion.pages.retrieve({ page_id: slug });
    } else {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "Slug",
                rich_text: { equals: slug }
            }
        });
        page = response.results[0];
    }

    if (!page || !("properties" in page)) return null;

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const mdResponse = n2m.toMarkdownString(mdBlocks);
    const markdown = mdResponse.parent;

    return {
        id: page.id,
        title: (page.properties.Title as any)?.title[0]?.plain_text ?? "Untitled",
        date: (page.properties["Published Date"] as any)?.date?.start ?? null,
        blocks: mdBlocks,
    };
});
