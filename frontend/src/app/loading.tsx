"use client";

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 md:h-24 md:w-12 lg:h-30 lg:w-30 xl:h-36 xl:w-36 border-t-2 md:border-t-3 lg:border-t-4 xl:border-t-4 xl:border-b-4 border-b-2 md:border-b-3 lg:border-b-4 border-[var(--primary-9)]">
        {/* <div className="animate-spin rounded-full h-12 w-12 md:h-24 md:w-12 lg:h-36 lg:w-36 xl:h-30 xl:w-30 border-t-2 md:border-t-3 lg:border-t-4 xl:border-t-4 xl:border-b-4 border-b-2 md:border-b-3 lg:border-b-4 border-[var(--primary-9)]"></div> */}
      </div>
    </div>
  );
};

export default Loading;
