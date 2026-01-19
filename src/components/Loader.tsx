import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center my-4">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
