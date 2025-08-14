import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  isPromoted?: boolean;
  tags?: string[];
}

const RestaurantCard = ({
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  distance,
  isPromoted = false,
  tags = []
}: RestaurantCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isPromoted && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Promoted
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 fill-current text-yellow-500" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm">{cuisine}</p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {deliveryFee === "0" ? (
              <span className="text-success font-medium">Free delivery</span>
            ) : (
              <span>Delivery: ${deliveryFee}</span>
            )}
          </span>
          <Button variant="outline" size="sm">
            View Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;