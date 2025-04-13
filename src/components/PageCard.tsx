import React from "react";
import Image from "next/image";
import BlogImage from "../../public/images/Image.png";

const PageCard = () => {
  return (
    <div className="px-8 py-10">
      <div className="div-card px-4 py-4">
        <Image src={BlogImage} alt="" />
      </div>
    </div>
  );
};
export default PageCard;
