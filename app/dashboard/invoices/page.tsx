import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

// page 컴포넌트는 searchParams 사용 가능
export default async function Page({
  searchParams,
}: {
  // ? => searchParams이 없을 수도 있다는 의미 (옵션임)
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // 객체?. 은 해당 객체가 없을 경우 에러 방지
  // || 연산자는 왼쪽 값이 있으면 왼쪽 값 리턴하고 없으면 오른쪽 값 리턴
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // 검색어 기준 총 페이지 수 반환, 12개인 경우 6개 표시되면 총 페이지 2
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
