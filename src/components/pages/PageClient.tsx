"use client";

import Markdown from "marked-react";
import { v4 as uuidv4 } from "uuid";
import { TriangleAlertIcon } from "lucide-react";
import CodeRender from "./CodeRenderer";
import type { db as DbPage } from "./types";

function slugify(text: string) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const linkClass = "roc-link";

export const renderer = {
  heading(text: string, level: number) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    const id = slugify(text);
    const size =
      level === 1
        ? "text-4xl mb-[7px]"
        : level === 2
          ? "text-3xl mb-[6px]"
          : level === 3
            ? "text-2xl mb-[5px]"
            : level === 4
              ? "text-xl mb-[4px]"
              : "text-lg mb-[4px]";
    return (
      <Tag id={id} key={uuidv4()} className={`${size} font-bold text-[#000095] drop-shadow-[1px_1px_0_#ffe66d] dark:text-cyan-300`}>
        {text}
      </Tag>
    );
  },
  paragraph(text: string) {
    return (
      <p className="my-[9px] leading-relaxed text-foreground" key={uuidv4()}>
        {text}
      </p>
    );
  },
  text(text: string) {
    return <span key={uuidv4()}>{text}</span>;
  },
  list(children: React.ReactNode, ordered: boolean, start?: number) {
    const Tag = ordered ? "ol" : "ul";
    return (
      <Tag
        key={uuidv4()}
        start={ordered ? start : undefined}
        className={ordered ? "my-[8px] ml-6 list-decimal space-y-[3px]" : "my-[8px] ml-6 list-disc space-y-[3px]"}
      >
        {children}
      </Tag>
    );
  },
  listItem(children: React.ReactNode) {
    return (
      <li key={uuidv4()} className="pl-1 leading-relaxed text-foreground">
        {children}
      </li>
    );
  },
  strong(text: string) {
    return (
      <b className="font-black text-red-700 dark:text-yellow-300" key={uuidv4()}>
        {text}
      </b>
    );
  },
  image(src: string, alt: string) {
    return (
      <img
        src={src}
        alt={alt}
        key={uuidv4()}
        className="my-[9px] h-auto max-w-full border-[3px] border-gray-500 shadow-[4px_4px_0_rgba(0,0,0,.28)]"
      />
    );
  },
  link(href: string, text: string) {
    return (
      <a href={href} className={linkClass} target="_blank" rel="noreferrer" key={uuidv4()}>
        {text}
      </a>
    );
  },
  code(code: string, type: string) {
    return <CodeRender code={code} type={type} key={uuidv4()} />;
  },
  inlineCode(code: string) {
    return (
      <code key={uuidv4()} className="border border-gray-500 bg-yellow-200 px-1 py-0.5 font-mono text-sm text-black">
        {code}
      </code>
    );
  },
};

function PageArchivedBanner({ writer }: { writer: string }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-2 border-b-4 border-yellow-300 bg-red-700 p-[7px] text-white">
      <TriangleAlertIcon />
      <h2 className="text-lg font-bold">【封存公告】本頁面已由 {writer} 辦理封存作業</h2>
    </div>
  );
}

export default function PageClient({ db }: { db: DbPage }) {
  return (
    <div className="min-h-screen text-foreground">
      {db.page_type === "landing" ? (
        <Landing db={db} />
      ) : db.page_type === "simple" || db.page_type === "info" ? (
        <Simple db={db} />
      ) : (
        <div className="roc-panel p-[20px] text-center text-4xl font-bold text-gray-500">
          Content Not Available
        </div>
      )}
      {db.status === "archived" && <PageArchivedBanner writer={db.writer} />}
    </div>
  );
}

function Landing({ db }: { db: DbPage }) {
  return (
    <div className="roc-panel">
      <div className="roc-panel-heading">【專題頁面e化資訊】{db.title}</div>
      {db.landing_image ? (
        <div className="p-[7px]">
          <img
            src={db.landing_image}
            alt={`A hero image for ${db.title}`}
            className="h-[360px] w-full border-[3px] border-gray-500 object-cover shadow-[4px_4px_0_rgba(0,0,0,.28)]"
          />
        </div>
      ) : null}
      <div className="border-y-2 border-red-700 bg-[hsl(52_94%_78%)] p-[7px] text-black">
        <h1 className="roc-home-title">{db.title}</h1>
        <a href="#learnmore" className="roc-button inline-block">進一步瞭解本項服務</a>
      </div>
      <div id="learnmore" className="p-[9px]">
        <article className="max-w-none text-base">
          <Markdown renderer={renderer} gfm breaks>
            {db.markdown_content}
          </Markdown>
        </article>
      </div>
    </div>
  );
}

function Simple({ db }: { db: DbPage }) {
  return (
    <div className="roc-panel p-[8px]">
      <div className="roc-panel-heading -m-[8px] mb-[8px]">【內容資訊瀏覽】{db.title}</div>
      <article className="max-w-none text-base">
        <Markdown renderer={renderer} gfm breaks>
          {db.markdown_content}
        </Markdown>
      </article>
    </div>
  );
}
