import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 280,
      margin: 1,
      color: {
        dark: '#0B3B24',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    // fallback SVG data URI
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="%23f0fdf4"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23166534">QR ERROR</text></svg>`;
  }
}
