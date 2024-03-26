import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center">
      <div className="container mx-auto p-4 flex flex-wrap items-center">
        <div className="w-full md:w-7/12 text-center md:text-left p-4">
          <div className="text-6xl font-medium">404</div>
          <div className="text-xl md:text-3xl font-medium mb-4">Oops. This page has gone missing.</div>
          <div className="text-lg mb-8">You may have mistyped the address or the page may have moved.</div>
          <Link to="/" className="border border-white rounded p-4">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
