"use client";
import { use } from 'react';
type Params = Promise<{ coinId: string }>

export default function GPSFix(props: { params: Params }) {
  const params = use(props.params);
  const coinId = params.coinId;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {coinId}
    </div>
  );
}
  