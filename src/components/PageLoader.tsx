import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="page-loader" aria-hidden="true">
      <Image
        className="loader-mark"
        src="/assets/loader-j.webp"
        alt=""
        width={155}
        height={240}
        loading="eager"
        fetchPriority="high"
        unoptimized
      />
      <span>Turning ideas into interfaces</span>
      <div className="loader-track">
        <i />
      </div>
    </div>
  );
}
