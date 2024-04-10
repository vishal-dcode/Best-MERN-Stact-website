import React from 'react';
import {Link} from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="bg-white text-black flex items-center py-20">
      <div className="container mx-auto p-4 flex flex-wrap items-center ">
        <div className="w-full md:text-left p-4">
          <div className="text-6xl font-medium text-center">404</div>
          <div className="text-xl md:text-3xl font-medium mb-4 text-center">
            Oops. This page has gone missing.
          </div>
          <div className="text-lg mb-8 text-center">
            You may have mistyped the address or the page may have moved.
          </div>
          <div className="text-center">
            <Link to="/" className="border border-black rounded p-4 ">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
