import { Backpack, Heart, Users } from "lucide-react";
import React from "react";

export default function Services() {
  return (
    <section className="py-10 md:py-20">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Why Travel With Us?
          </h2>
          <p className="text-lg sm:text-2xl mb-6 md:mb-14"></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="card-body items-center text-center gap-4">
              <i className="bi bi-search text-4xl"></i>
              <Backpack />
              <h2 className="card-title">Easy-To-Use</h2>
              <p>
                We make planning your travel hassle-free with our intuitive
                itinerary builder. Create and organize your entire trip,
                including flights, accommodations, and activities, all in one
                place. Say goodbye to scattered bookings and hello to a
                well-structured, stress-free adventure
                <br className="hidden xl:inline" />
                <br className="hidden xl:inline" />{" "}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="card-body items-center text-center gap-4">
              <i className="bi bi-chat-left-dots text-4xl"></i>
              <Users />
              <h2 className="card-title">Community Insights</h2>
              <p>
                Connect with a community of fellow travelers on Jet Set Go.
                Share your experiences, read reviews, and get real-time advice
                from like-minded explorers. This feature fosters a sense of
                camaraderie and ensures you&apos;re always in the know, no
                matter where your journey takes you
                <br className="hidden xl:inline" />
                <br className="hidden xl:inline" />{" "}
              </p>
            </div>
          </div>

          <div className="card bg-base-200 transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="card-body items-center text-center gap-4">
              <i className="bi bi-badge-ad text-4xl"></i>
              <Heart />
              <h2 className="card-title">Personalized</h2>
              <p>
                Jet Set Go stands out by using your past travel history to
                provide tailored recommendations for your future journeys. Our
                app analyzes your travel preferences and offers suggestions that
                align with your unique interests, ensuring every trip is
                designed just for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
