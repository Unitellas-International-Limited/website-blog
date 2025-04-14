"use client";

interface PageHeaderProps {
  title: string;
  subtitles: string[];
}

export default function PageHeader({ title, subtitles }: PageHeaderProps) {
  return (
    <section
      className={
        "relative flex h-80 flex-col items-center justify-center overflow-hidden bg-gray-900 p-4"
      }
    >
      <h1 className="mb-5 text-center font-main text-5xl text-[var(--color-primary)] sm:text-7xl md:text-8xl">
        {title}
      </h1>

      {subtitles.map((subtitle, index) => (
        <div key={index}>
          <p className="text-xl my-1 max-w-5xl text-center sm:text-3xl font-main text-white">
            {subtitle}
          </p>
        </div>
      ))}
    </section>
  );
}
