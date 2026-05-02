import React from "react";

function HomeContainer({ children }: { children: React.ReactNode }) {
  return <div className="max-w-5xl flex flex-col">{children}</div>;
}

export default HomeContainer;
