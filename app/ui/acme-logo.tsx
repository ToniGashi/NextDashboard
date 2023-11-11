import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} p-3 flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[35px] md:text-[44px]">Toni</p>
    </div>
  );
}
