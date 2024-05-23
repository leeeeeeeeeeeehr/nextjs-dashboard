import '@/app/ui/global.css';
import { pretendard } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* {children}에는 같은 경로에 있는 page.tsx가 들어옴 */}
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
