export interface PhoneContact {
  raw: string;
  display: string;
  tel: string;
}

export interface UpiConfig {
  enabled: boolean;
  id: string;
  payeeName: string;
  merchantId: string;
  qrImage: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  address: string;
  shortAddress: string;
  landmark: string;
  cityState: string;
  phones: PhoneContact[];
  email: string;
  whatsappNumber: string;
  smsNumber: string;
  hours: string;
  mapQuery: string;
  formAccessKey: string;
  upi: UpiConfig;
  licences: string[];
  logoUrl: string;
}

export const PLACEHOLDER_VALUE = 'TO_BE_ADDED';

export function isConfiguredValue(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed !== PLACEHOLDER_VALUE;
}

export const config: SiteConfig = {
  name: 'MAZUMDER Medical Hall',
  tagline: 'Your Health, Our Priority',
  address: 'N.S. Road (Opposite Rabindra Mela Gate), Hailakandi, Assam, India',
  shortAddress: 'N.S. Road, Hailakandi, Assam',
  landmark: 'Opposite Rabindra Mela Gate',
  cityState: 'Hailakandi, Assam',
  phones: [
    {
      raw: '8486966659',
      display: '+91 84869 66659',
      tel: 'tel:+918486966659',
    },
    {
      raw: '7002173638',
      display: '+91 70021 73638',
      tel: 'tel:+917002173638',
    },
  ],
  email: 'mazumdermedicalhall7@gmail.com',
  whatsappNumber: '917002173638',
  smsNumber: '+917002173638',
  hours: 'TO_BE_ADDED',
  mapQuery: 'MAZUMDER Medical Hall, N.S. Road, Hailakandi, Assam',
  formAccessKey: '',
  upi: {
    enabled: true,
    id: 'Vyapar.173291024121@hdfcbank',
    payeeName: 'MAZUMDER MEDICAL HALL',
    merchantId: '36559219',
    qrImage:
      '/assets/aistudio/WhatsApp_Image_2026-11-02_at_4.11.14_PM_94374ab2.jpeg',
  },
  licences: [],
  logoUrl: '',
};
