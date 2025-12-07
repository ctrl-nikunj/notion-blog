import { MdBlock } from "notion-to-md/build/types";

import {
    Paragraph,
    H1,
    H2,
    Callout,
    ImageBlock,
    BulletedListItem,
    Quote,
    Code,
    Divider,
    Table,
    H3
} from "./ui/components";

export default function MDXRenderer({ blocks }: { blocks: Array<MdBlock> }) {
    return blocks.map(block => {
        switch (block.type) {
            case "paragraph": return <Paragraph key={block.blockId} text={block.parent} />
            case "heading_1": return <H1 key={block.blockId} text={block.parent} />
            case "heading_2": return <H2 key={block.blockId} text={block.parent} />
            case "callout": return <Callout key={block.blockId} text={block.parent} />
            case "image": return <ImageBlock key={block.blockId} text={block.parent} />
            case "bulleted_list_item": return <BulletedListItem key={block.blockId} text={block.parent} />
            case "quote": return <Quote key={block.blockId} text={block.parent} />
            case "code": return <Code key={block.blockId} text={block.parent} />
            case "divider": return <Divider key={block.blockId} text={block.parent} />
            case "table": return <Table key={block.blockId} text={block.parent} />
            case "heading_3": return <H3 key={block.blockId} text={block.parent} />
            // etc…
        }
    });
}
