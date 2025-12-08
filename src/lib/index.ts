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
    tags: string[];
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

    console.log(
        response.results.map((page: any) => {
            return {
                id: page.id,
                title: page.properties.Title?.title[0]?.plain_text ?? "Untitled",
                slug: page.properties.Slug?.rich_text[0]?.plain_text ?? page.id,
                date: page.properties["Published Date"]?.date?.start ?? undefined,
                tags: page.properties.Tags?.multi_select.map((tag: any) => tag.name) ?? [],
                cover: page.cover?.external?.url ?? "",
            }
        })
    );
    return response.results.map((page: any) => {
        return {
            id: page.id,
            title: page.properties.Title?.title[0]?.plain_text ?? "Untitled",
            slug: page.properties.Slug?.rich_text[0]?.plain_text ?? page.id,
            date: page.properties["Published Date"]?.date?.start ?? undefined,
            tags: page.properties.Tags?.multi_select.map((tag: any) => tag.name) ?? [],
            cover: page.cover?.external?.url ?? "",
        }
    });
});

getAllPosts();