function setWebsiteTitle(title: string) {
  document.title = title;
}

function setWebIcon(iconFileKey?: string) {
  if (!iconFileKey) {
    return;
  }

  // Select the head element
  const [head] = document.getElementsByTagName('head');

  // Remove existing favicon links
  const existingIcons = head.querySelectorAll("link[rel*='icon']");
  existingIcons.forEach(icon => {
    icon.parentNode?.removeChild(icon);
  });

  // Create a new favicon link
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = iconFileKey.replace('http://', 'https://');

  // Append the new favicon link to the head
  head.appendChild(link);
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}

function checkIsRgbColor(color: string) {
  return /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.test(color);
}

function hexToRgb(color: string) {
  if (checkIsRgbColor(color)) {
    const match = color.match(
      /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
    ) as RegExpMatchArray;

    const [r, g, b] = match.slice(1).map(Number);
    return { b, g, r };
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return result
    ? {
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function getHexColorVariant(color: string, lightVolume: number) {
  const { b, g, r } = hexToRgb(color) || { b: 0, g: 0, r: 0 };

  return rgbToHex(
    Math.round(r + (255 - r) * (1 - lightVolume)),
    Math.round(g + (255 - g) * (1 - lightVolume)),
    Math.round(b + (255 - b) * (1 - lightVolume)),
  );
}

export const ThemeTool = {
  checkIsRgbColor,
  componentToHex,
  getHexColorVariant,
  hexToRgb,
  rgbToHex,
  setWebIcon,
  setWebsiteTitle,
};
