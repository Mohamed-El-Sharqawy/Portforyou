import Loading from "@/app/loading";

export default function Fallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999999999999] bg-black">
      <Loading />
    </div>
  );
}
