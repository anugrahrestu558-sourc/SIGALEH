import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard() {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5">
      <Skeleton height={20} width={100} />

      <Skeleton
        height={40}
        width={120}
        className="mt-4"
      />

      <Skeleton
        height={20}
        width={80}
        className="mt-4"
      />
    </div>
  );
}