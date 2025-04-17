"use client";
import Image from "next/image";
import Icon from "../../public/assets/images/unitellasicon.png";

interface PageHeaderProps {
  title: string;
  subtitles: string[];
}

export default function PageHeader({ title, subtitles }: PageHeaderProps) {
  return (
    <section
      className={
        "flex h-80 flex-col items-center justify-center overflow-hidden w-full bg-gray-900 p-4"
      }
    >
      <Image src={Icon} alt="Unitellas Icon" className="object-contain" />

      <h1 className="mb-5 text-center flex items-center font-main text-5xl text-[var(--color-primary)] sm:text-7xl md:text-8xl">
        {title}
      </h1>

      {subtitles.map((subtitle, index) => (
        <div key={index}>
          <p className="text-xl mt-1 mb-2 max-w-5xl text-center sm:text-3xl font-main text-white">
            {subtitle}
          </p>
        </div>
      ))}
    </section>
  );
}
