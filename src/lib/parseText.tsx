export function parseText(text: string) {
  let html = text;

  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    `<a href="$2" target="_blank" rel="noopener noreferrer"
        class="text-red-400 hover:underline">$1</a>`
  );

//   html = html.replace(
//     /(https?:\/\/[^\s]+)/g,
//     `<a href="$1" target="_blank" rel="noopener noreferrer"
//         class="text-cyan-500 hover:underline">$1</a>`
//   );

  html = html.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`);
  html = html.replace(/(?<!\*)\*(?!\*)(.*?)\*(?<!\*)/g, `<em>$1</em>`);
  html = html.replace(/`([^`]+)`/g, `<code class='bg-gray-800 px-1 py-0.5 rounded text-red-400'>$1</code>`);
  html = html.replace(/_(.*?)_/g, `<u>$1</u>`);

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
