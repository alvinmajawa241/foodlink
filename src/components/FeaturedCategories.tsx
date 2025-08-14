const categories = [
  { name: "Pizza", emoji: "🍕", count: "150+ restaurants" },
  { name: "Burgers", emoji: "🍔", count: "80+ restaurants" },
  { name: "Sushi", emoji: "🍣", count: "45+ restaurants" },
  { name: "Healthy", emoji: "🥗", count: "120+ restaurants" },
  { name: "Desserts", emoji: "🧁", count: "60+ restaurants" },
  { name: "Coffee", emoji: "☕", count: "90+ restaurants" },
  { name: "Asian", emoji: "🍜", count: "200+ restaurants" },
  { name: "Mexican", emoji: "🌮", count: "70+ restaurants" },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What would you like to order?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through thousands of restaurants and discover your next favorite meal
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="bg-card rounded-xl p-6 text-center hover:shadow-card transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.emoji}
              </div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;