import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
export const Code = ({ code }: { code: string }) => {
  return (
    <SyntaxHighlighter
      language="json"
      style={nightOwl}
      customStyle={{
        borderRadius: 4,
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--input))",
        minHeight: "100%",
        maxHeight: "100%",
        overflow: "auto",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
