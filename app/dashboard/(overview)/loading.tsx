import DashboardSkeleton from '@/app/ui/skeletons';

// 로딩이 오래 걸릴 땐 Loading UI를 추가해주는 것이 좋음
export default function Loading() {
  // 로딩 중을 문자로만 보여줌
  // return <div>Loading...</div>;

  // 로딩 중을 시각적으로 보여줌
  return <DashboardSkeleton />;
}
