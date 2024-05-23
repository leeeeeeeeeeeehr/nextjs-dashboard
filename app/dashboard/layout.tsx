import SideNav from '@/app/ui/dashboard/sidenav';

// 제일 밖에 있는 layout만 root layout으로 사용하고, 하위에서 사용하는 모든 layout은 그냥 사용해야 함
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
