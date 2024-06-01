import { Loader } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex justify-center">
      <Loader className="size-20 animate-spin" />
    </div>
  );
}
