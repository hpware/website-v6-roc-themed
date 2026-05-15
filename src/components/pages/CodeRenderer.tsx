"use client";

import { Highlight, themes } from "prism-react-renderer";

export default function CodeRender({
  code,
  type,
}: {
  code: string;
  type?: string;
}) {
  return (
    <div className="my-[8px] max-h-full max-w-full overflow-hidden border-2 border-gray-500">
      <div className="flex items-center justify-between border-b-2 border-gray-500 bg-yellow-200 px-[7px] py-[3px] text-black">
        <span className="font-mono text-sm font-bold">
          ◆ 程式碼附件：{type || "text"}
        </span>
      </div>
      <Highlight
        theme={themes.nightOwl}
        code={code}
        language={type || "text"}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-auto bg-gray-900 p-[8px]" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-4 select-none text-yellow-300">{String(i + 1).padStart(3, "0")}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
