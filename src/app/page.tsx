import PageHeader from "@/components/pageHeader";
import Home from "./home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Unitellas International Limited",
  description:
    "Discover latest insights, news and resources from Africa’s first hyper-scale edge cloud platform, Unitellas.",
  keywords: [
    "Unitellas Blog",
    "Edge Cloud resources",
    "Cloud Computing Africa news",
    "Enterprise Cloud Services",
    "Unitellas International Limited",
    "Cloud Services Nigeria",
    "Data Center Africa industry news",
  ],
  alternates: {
    canonical: "https://blog.unitellas.com.ng/",
  },
  openGraph: {
    title: "Blog | Unitellas International Limited",
    description:
      "Unitellas delivers scalable, secure, and affordable cloud infrastructure tailored for Africa’s digital transformation. Visit our blog to get the latest news and resources on edge cloud.",
    url: "https://blog.unitellas.com.ng/",
    siteName: "Unitellas International Limited Blog",
    type: "website",
    images: [
      {
        url: "https://blog.unitellas.com.ng/assets/images/unitellasicon.png",
        width: 1200,
        height: 630,
        alt: "Unitellas Edge Cloud Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Unitellas Edge Cloud Services",
    description:
      "The future of cloud in Africa — scalable and affordable edge computing from Unitellas.",
    site: "@Unitellasil",
    creator: "@Unitellasil",
    images: ["https://blog.unitellas.com.ng/assets/images/unitellasicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};
const BlogHome: React.FC = () => {
  const subtitles = [
    "Resources and Insights",
    "The latest industry news, technologies, and resources from Unitellas Edge Cloud.",
  ];

  return (
    <div className="w-full">
      <PageHeader title="The Offical Unitellas Blog" subtitles={subtitles} />
      <Home />
    </div>
  );
};

export default BlogHome;
