import localFont from 'next/font/local';

export const greycliffCF = localFont({
  src: [
    {
      path: '../assets/fonts/GreycliffCF-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GreycliffCF-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GreycliffCF-Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GreycliffCF-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GreycliffCF-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});
