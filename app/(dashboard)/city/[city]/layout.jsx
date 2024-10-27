import React from 'react'
export async function generateMetadata({ params }) {
    const { city } = params;
    // Set up metadata for SEO, Open Graph, and Twitter
    const title = `${city} - Explore the Best Places of ${city}`;
    const description = `Discover the best places to visit in ${city}, current weather, and more about ${city}.`;
    const url = `http://localhost:3000/city/${city}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: "Travel Planner",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        title,
        description,
      },
    };
  }
const layout = ({children}) => {
  return (
    <div>
        {children}
        </div>
  )
}

export default layout