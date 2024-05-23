// next는 구글 폰트를 위한 모듈을 제공하고 있음
import { Montserrat, Lusitana } from 'next/font/google';
import localFont from 'next/font/local';

// montserrat는 variable(= 변수형 폰트)이기 때문에 font-weight를 지정하지 않아도 됨
export const montserrat = Montserrat({
  // subset -> 최적화 해줌
  subsets: ['latin'],
  // display: 'swap' -> 시스템 별로 swap 방식이 다르기 때문에 지정해줌
  // 이를 지정해주면 처음에는 시스템 폰트를 보여주다가 구글 폰트의 로딩이 끝나면 swap (= 구글폰트로 바꿈)해서 보여줌
  // (지정하지 않으면 화면상에 폰트가 안보이다가 로딩이 끝나면 보이는 등 시스템 별로 다름 )
  display: 'swap',
});
// 변수를 지원하지 않기 때문에 weight을 필수로 넣어야 함
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const pretendard = localFont({
  src: [
    // @ 경로 사용 불가, 최상단에서 import할 때만 @ 경로 사용 가능
    { path: '../../public/fonts/Pretendard-Regular.woff', weight: '400' },
    { path: '../../public/fonts/Pretendard-Medium.woff', weight: '500' },
    { path: '../../public/fonts/Pretendard-Bold.woff', weight: '700' },
  ],
  display: 'swap',
});
