import { useEffect } from "react";

export const SEO = ({
  title,
  description = "Outmax Services provides end-to-end BPO operations, high-volume performance marketing, mass-tort lead acquisition, and bespoke web architecture for high-growth enterprises worldwide.",
  canonical,
  ogImage = "https://www.outmaxservices.com/images/outmax-logo.png",
  ogType = "website",
}) => {
  useEffect(() => {
    // Document title formatting (prevent duplicate brand names)
    let fullTitle = "Outmax Services | Business Process Outsourcing, Performance Marketing & Digital Operations";
    if (title) {
      if (title.toLowerCase().includes("outmax")) {
        fullTitle = title;
      } else {
        fullTitle = `${title} | Outmax Services`;
      }
    }
    document.title = fullTitle;

    // Helper function to set or create meta tag
    const setMeta = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Meta Description & Robots
    setMeta("name", "description", description);

    // Canonical link
    const currentCanonical = canonical || `https://www.outmaxservices.com${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", currentCanonical);

    // OpenGraph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", currentCanonical);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", "Outmax Services");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:url", currentCanonical);
  }, [title, description, canonical, ogImage, ogType]);

  return null;
};

export default SEO;
