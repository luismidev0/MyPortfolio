import { useEffect } from 'react';

const BASE = 'https://www.luismidev0.com';

function setAttr(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Keeps the per-route <title>, description, canonical and the OG/Twitter
// mirrors in sync as the user navigates the SPA (and switches language).
export function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setAttr('meta[property="og:title"]', 'content', title);
      setAttr('meta[name="twitter:title"]', 'content', title);
    }
    if (description) {
      setAttr('meta[name="description"]', 'content', description);
      setAttr('meta[property="og:description"]', 'content', description);
      setAttr('meta[name="twitter:description"]', 'content', description);
    }
    const url = BASE + path;
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
  }, [title, description, path]);
}
