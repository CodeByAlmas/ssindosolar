import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'SS Indo Solar', short_name: 'SS Indo Solar', description: 'Solar EPC company in Kanpur: rooftop, off-grid and hybrid solar, net-metering liasoning, AMC and module cleaning.', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0d4455', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] };
}
