/**
 * Generates a simple blur placeholder data URL for images
 */
export const generateBlurDataURL = (width = 40, height = 40): string => {
  // Create a simple gradient blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#3730a3;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#1e1b4b;stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Space-themed blur placeholder for NASA APOD images
 */
export const SPACE_BLUR_PLACEHOLDER = generateBlurDataURL(600, 400);
