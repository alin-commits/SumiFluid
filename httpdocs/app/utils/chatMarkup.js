/**
 * Parses a constrained markup subset used by chat replies:
 * **bold**, __underline__ and [label](url) links.
 * Returns an array of {type: 'text'|'bold'|'underline'|'link', text, url?}
 * for safe Vue rendering — never raw HTML/v-html.
 */
export function parseChatMarkup(input) {
  const text = input ?? "";
  const pattern = /\*\*(.+?)\*\*|__(.+?)__|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: "text", text: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      nodes.push({ type: "bold", text: match[1] });
    } else if (match[2] !== undefined) {
      nodes.push({ type: "underline", text: match[2] });
    } else if (match[3] !== undefined) {
      nodes.push({ type: "link", text: match[3], url: match[4] });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push({ type: "text", text: text.slice(lastIndex) });
  }

  return nodes;
}
