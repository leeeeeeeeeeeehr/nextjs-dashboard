'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // 검색 매개변수 사용
  const searchParams = useSearchParams();
  // URL 경로 가져오기
  const pathname = usePathname();
  // 라우터 replace 함수
  const { replace } = useRouter();

  // // 타입스크립트이기 때문에 매개변수에 타입을 명시해줌
  // function handleSearch(term: string) {
  //   // 글씨 한 글자 쓸 때마다 데이터 요청
  //   console.log(`Searching... ${term}`);

  //   // 검색 매개변수 사용하는 인스턴스 생성
  //   const params = new URLSearchParams(searchParams);

  //   // 입력이 빈 칸이면 delete 실행하여 + 로 문자 연결
  //   if (term) {
  //     params.set('query', term);
  //   } else {
  //     params.delete('query');
  //   }
  //   // 검색 데이터로 url 업데이트
  //   // -> 검색창에 입력한 내용이 url 주소 창에 바로바로 올라감
  //   replace(`${pathname}?${params.toString()}`);
  // }

  //  위의 함수로 실행하면 너무 빠르게 실행되기 때문에 useDebounce 함수로 감아줌
  //  -> 이를 통해 실행 속도를 늦춰줌 (글씨 한 글자 쓸 때마다 실행되기 때문에)
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    // 검색어 입력 시 페이지 매개변수 1로 재설정
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // url 주소 창에 query=(~~) 입력하면 검색창에 (~~)(= 입력한 내용) 뜸
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
