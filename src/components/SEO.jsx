import { useEffect } from "react";

export const SEO = ({
  title,
  description = "Outmax Services Ltd is an outsourcing and digital growth partner providing BPO, performance marketing, media buying, affiliate management, and web engineering.",
  canonical,
  ogType = "website",
}) => {
  useEffect(() => {
    // Document title
    const fullTitle = title
      ? `${title} | Outmax Services Ltd`
      : "Outmax Services Ltd | BPO · Performance Marketing · Digital Solutions";
    document.title = fullTitle;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;
  }, [title, description, canonical, ogType]);

  return null;
};

export default SEO;
