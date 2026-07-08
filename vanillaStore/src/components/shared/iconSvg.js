import heartSvgRaw from '../assets/heart.svg?raw';
import starSvgRaw from '../assets/star.svg?raw';

function createSvgElement(svgRawString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgRawString, 'image/svg+xml');
  return doc.documentElement;
}

export function HeartIcon({ className = "" } = {}) {
  const svgElement = createSvgElement(heartSvgRaw);

  return El({
    element: "div",
    className: `icon inline-block ${className}`,
    innerHTML: svgElement.outerHTML
  });
}

export function StarIcon({ className = "" } = {}) {
  const svgElement = createSvgElement(starSvgRaw);
  return El({
    element: "div",
    className: `icon inline-block ${className}`,
    innerHTML: svgElement.outerHTML
  });
}