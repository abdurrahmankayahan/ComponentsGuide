import { ColorValue } from "react-native";

export interface Theme {

  primary: ColorValue;
  secondary: ColorValue;
  accent: ColorValue;
  
  onPrimary: ColorValue;
  onSecondary: ColorValue;
  onAccent: ColorValue;


  background: ColorValue;
  surface: ColorValue;
  border: ColorValue;
  
  onBackground: ColorValue;
  onSurface: ColorValue;



}


export const lightTheme: Theme = {


  primary: '#4F46E5',
  secondary: '#7C75ED',
  accent: '#6F68FF',
  
  onPrimary: '#FFFFFF',     // koyu primary → beyaz text
  onSecondary: '#FFFFFF',
  onAccent: '#FFFFFF',


  background: '#eee',
  surface: '#ddd',
  border: '#E4E7F5',
  
  onBackground: '#111827',   // eski textPrimary
  onSurface: '#111827',
};
export const darkTheme: Theme = {


  primary: '#6F68FF',
  secondary: '#8F8AFF',
  accent: '#8A84FF',
  
  onPrimary: '#FFFFFF',     // koyu mavi/mor → beyaz text
  onSecondary: '#0F172A',   // açık secondary → koyu text
  onAccent: '#0F172A',

  background: '#333',
  surface: '#222',
  border: '#1E293B',
  
  onBackground: '#E5E7EB',   // eski textPrimary
  onSurface: '#E5E7EB',
  
};



export const themeUsageGuide = {
  background: {
    title: 'Background',
    description:
      'Uygulamanın ana zemin rengidir. Ekranların, sayfaların ve genel layout alanlarının arka planında kullanılır.',
    usage: [
      'Ana ekran arka planı',
      'ScrollView / FlatList zeminleri',
      'Sayfa (screen) arka planları',
      'Modal dış arka planı',
    ],
  },

  onBackground: {
    title: 'On Background',
    description:
      'Background rengi üzerinde gösterilen tüm yazı ve ikonların rengidir. Okunabilirlik için zorunludur.',
    usage: [
      'Başlık metinleri',
      'Paragraf ve açıklama yazıları',
      'Liste elemanı yazıları',
      'Form label ve açıklamaları',
    ],
  },

  surface: {
    title: 'Surface',
    description:
      'Background üzerinde yükseltilmiş (ayrışmış) yüzeyleri temsil eder.',
    usage: [
      'Card bileşenleri',
      'Bottom sheet içerikleri',
      'Modal iç alanları',
      'Liste item arka planları',
      'Input container alanları',
    ],
  },

  onSurface: {
    title: 'On Surface',
    description:
      'Surface rengi üzerinde yer alan metin ve ikonlar için kullanılır.',
    usage: [
      'Card içi metinler',
      'Input text',
      'Ayar satırı yazıları',
      'Liste açıklamaları',
    ],
  },

  primary: {
    title: 'Primary',
    description:
      'Uygulamanın ana marka rengidir. En önemli aksiyonları temsil eder.',
    usage: [
      'Ana aksiyon (CTA) butonları',
      'Aktif tab bar item',
      'Aktif ikonlar',
      'Progress bar dolu alanı',
      'Switch / checkbox aktif durumu',
    ],
  },

  onPrimary: {
    title: 'On Primary',
    description:
      'Primary rengi üzerinde kullanılan metin ve ikon rengidir.',
    usage: [
      'Primary buton yazıları',
      'Primary iconlar',
      'Badge içi metinler',
    ],
  },

  secondary: {
    title: 'Secondary',
    description:
      'Primary’ye göre daha düşük öncelikli ama hâlâ vurgulu alanlar için kullanılır.',
    usage: [
      'İkincil butonlar',
      'Seçili ama pasif durumlar',
      'Highlight edilmiş liste elemanları',
      'Grafiklerde yardımcı vurgu rengi',
    ],
  },

  onSecondary: {
    title: 'On Secondary',
    description:
      'Secondary rengi üzerinde okunabilirlik sağlayan metin rengidir.',
    usage: [
      'Secondary buton yazıları',
      'Secondary ikonlar',
    ],
  },

  accent: {
    title: 'Accent',
    description:
      'Dikkat çekmesi gereken küçük ama önemli alanlar için kullanılan vurgu rengidir.',
    usage: [
      'Bildirim badge’leri',
      'Tag / chip bileşenleri',
      'Uyarı veya bilgi ikonları',
      'Küçük vurgu detayları',
    ],
  },

  onAccent: {
    title: 'On Accent',
    description:
      'Accent rengi üzerinde kullanılan metin ve ikon rengidir.',
    usage: [
      'Badge içi yazılar',
      'Accent iconlar',
    ],
  },

  border: {
    title: 'Border',
    description:
      'Bileşenleri birbirinden ayırmak için kullanılan çizgi ve kenarlık rengidir.',
    usage: [
      'Card kenarlıkları',
      'Input border çizgileri',
      'Divider ayraçları',
      'Liste elemanı ayırıcıları',
    ],
  },
};




export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
  },
  weights: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
};
