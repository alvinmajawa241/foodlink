import RestaurantCard from "./RestaurantCard";
import italianImage from "@/assets/restaurant-italian.jpg";
import asianImage from "@/assets/restaurant-asian.jpg";
import healthyImage from "@/assets/restaurant-healthy.jpg";
import foodCollageImage from "@/assets/food-collage.jpg";

const featuredRestaurants = [
  {
    id: "1",
    name: "Bella Italia",
    image: italianImage,
    cuisine: "Italian • Pizza",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "0",
    distance: "1.2 km",
    isPromoted: true,
    tags: ["Free delivery", "Popular"]
  },
  {
    id: "2",
    name: "Tokyo Fusion",
    image: asianImage,
    cuisine: "Japanese • Asian",
    rating: 4.7,
    deliveryTime: "30-40 min",
    deliveryFee: "2.99",
    distance: "2.1 km",
    tags: ["Sushi", "Ramen"]
  },
  {
    id: "3",
    name: "Green Bowl",
    image: healthyImage,
    cuisine: "Healthy • Salads",
    rating: 4.9,
    deliveryTime: "20-30 min",
    deliveryFee: "1.99",
    distance: "0.8 km",
    tags: ["Healthy", "Vegan options"]
  },
  {
    id: "4",
    name: "Burger Palace",
    image: foodCollageImage,
    cuisine: "American • Burgers",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: "0",
    distance: "1.5 km",
    tags: ["Free delivery", "Fast food"]
  }
];

const FeaturedRestaurants = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Featured Restaurants
            </h2>
            <p className="text-muted-foreground">
              Popular restaurants in your area
            </p>
          </div>
          <button className="text-primary hover:text-primary/80 font-medium">
            View all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;