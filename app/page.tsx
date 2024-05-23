import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import styles from './page.module.css';
// 페이지가 많은 프로젝트를 할 땐 상대경로가 아닌 절대 경로를 써줘야 함
// import styles from '@/app/ui/page.module.css';
import { lusitana } from '@/app/ui/fonts';
// 여기서 Image는 컴포넌트임
import Image from 'next/image';

export default function Page() {
  return (
    // 테일윈드 방식을 사용해서 스타일 정의함
    // 웹 사이트가 아닌 모바일을 만들 때 주로 사용하기 때문에 단위가 px가 아닌 rem임
    // prettier에 의해 중요도에 따라 코드가 정렬됨
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          {/* <p className={` text-xl text-gray-800 md:text-3xl md:leading-normal`}> */}
          {/* <p
            className={`${styles.test} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          > */}
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            {/* 폰트 크기나 색깔 코드를 넣을 땐 대괄호를 사용해서 넣어줘야 함 */}
            {/* <strong className="text-[40px] text-[#060]"> */}
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            // / -> public을 의미
            src="/hero-desktop.png"
            // 여기서 지정된 width, height은 초기값임
            // layout shift 방지하기 위함 (layout shift: 이미지가 로딩되는 중에 다른 요소들을 밀어내는 것)
            // 이미지 크기를 줄일 땐, 원본 크기와 비율을 계산해서 넣어줘야 함
            width={1000}
            height={760}
            // md -> 큰 화면일 때  (media query로 이해하기)
            // 반응형을 위함 (큰 화면일 땐 block, 작은 화면일 땐 hidden)
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {/* 반응형이기 때문에 모바일용 이미지 넣어줌 */}
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            // 반응형을 위함 (큰 화면일 땐 hidden, 작은 화면일 땐 block)
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
