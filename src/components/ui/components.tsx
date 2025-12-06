import { parseText } from "@/lib/parseText";
import Image from "next/image";

export function Paragraph({ text }: { text: string }) {
    return (
        <p className="text-base leading-7 text-gray-100 mb-4">
            {parseText(text)}
        </p>
    );
}

export function H1({ text }: { text: string }) {
    const string = text.replace(/\#/g,"");
    return (
        <h1 className="text-4xl text-white font-bold tracking-tight mt-10 mb-4">
            {parseText(string)}
        </h1>
    );
}

export function H2({ text }: { text: string }) {
    const string = text.replace(/\#/g,"");
    return (
        <h2 className="text-3xl text-white font-semibold tracking-tight mt-8 mb-3">
            {parseText(string)}
        </h2>
    );
}

export function Callout({ text }: { text: string }) {
    // extract emoji prefix
    const match = text.match(/^(.)(\s+)(.*)$/);
    const emoji = match ? match[1] : "💡";
    const content = match ? match[3] : text;

    return (
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <span className="text-xl">{emoji}</span>
            <div className="text-gray-800">{parseText(content)}</div>
        </div>
    );
}

export function ImageBlock({ text }: { text: string }) {
    return (
        <div className="my-6">
            <Image
                src={text}
                className="rounded-lg border mx-auto"
                alt="Notion Image"
            />
        </div>
    );
}

export function BulletedListItem({ text }: { text: string }) {
    return (
        <li className="ml-6 list-disc text-base leading-7 text-gray-800 my-1">
            {parseText(text)}
        </li>
    );
}

export function Quote({ text }: { text: string }) {
    return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
            {parseText(text)}
        </blockquote>
    );
}

export function Code({ text }: { text: string }) {
    const string = text.split("\n");
    const language = string[0].replace("```", "");
    const code = string.slice(1, string.length - 1).join("\n");

    return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm">
            <header className="text-xs text-gray-400 mb-2">{language}</header>
            <code>{code}</code>
        </pre>
    );
}

export function Divider({ text }: { text: string }) {
    return (
        <div className="my-6">
            <hr className="border-gray-500" />
        </div>
    );
}

export function Table({ text }: { text: string }) {
    const rows = text.split("\n").filter((row) => {
        if (!row.trim()) return false;
        const line = row.replace(/\|/g, "").replace(/\s/g, "");
        return !/^[\-:]+$/.test(line);
    });

    return (
        <div className="my-6 overflow-x-auto rounded-lg border border-gray-600">
            <table className="min-w-full text-sm border-collapse">
                <tbody>
                    {rows.map((row, rowIndex) => {
                        const cells = row
                            .split("|")
                            .map((cell) => cell.trim())
                            .filter((cell, i, arr) => {
                                if (i === 0 && cell === "") return false;
                                if (i === arr.length - 1 && cell === "") return false;
                                return true;
                            });

                        return (
                            <tr key={rowIndex} className={rowIndex === 0 ? "bg-gray-800 font-semibold text-gray-100" : "text-gray-300"}>
                                {cells.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`p-3 whitespace-pre-wrap border-gray-600 ${cellIndex === cells.length - 1 ? "" : "border-r"
                                            } ${rowIndex === rows.length - 1 ? "" : "border-b"}`}
                                    >
                                        {parseText(cell)}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}