import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section>
      <div className="hero h-96 md:h-[85vh] rounded-box overflow-hidden">
        <div className="hero-overlay bg-opacity-75 bg-primary"></div>
        <div className="hero-content text-center text-secondary-content">
          <div className="max-w-lg">
            <h1 className="mb-5 sm:mb-7 text-4xl sm:text-5xl font-bold">
              Jet-Set-Go
            </h1>
            <p className="mb-5 sm:mb-7 sm:text-lg text-center">
              Welcome to your ultimate travel planner app designed to elevate
              your wanderlust adventures!<br></br>At Jet-Set-Go, we understand
              that every traveler is unique, and so are their preferences.
              That&apos;s why we&apos;ve created a personalized travel companion
              that goes beyond the conventional trip planners.
            </p>
            <Link href="/app/search">
              <button className="btn btn-circle dark:btn-outline btn-warning sm:btn-wide text-white">
                Start Planning
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
