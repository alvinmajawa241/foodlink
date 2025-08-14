import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';

interface MenuItemModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

const MenuItemModal = ({ item, isOpen, onClose }: MenuItemModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string[]>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addItem } = useCartStore();
  const { toast } = useToast();

  // Initialize required modifiers with default values
  useState(() => {
    const initialModifiers: Record<string, string[]> = {};
    item.modifiers.forEach(group => {
      if (group.required) {
        const defaultOption = group.options.find(opt => opt.isDefault);
        if (defaultOption) {
          initialModifiers[group.id] = [defaultOption.id];
        }
      }
    });
    setSelectedModifiers(initialModifiers);
  });

  const handleModifierChange = (groupId: string, optionId: string, isChecked: boolean) => {
    const group = item.modifiers.find(g => g.id === groupId);
    if (!group) return;

    setSelectedModifiers(prev => {
      const current = prev[groupId] || [];
      
      if (group.maxSelection === 1) {
        // Radio behavior
        return { ...prev, [groupId]: isChecked ? [optionId] : [] };
      } else {
        // Checkbox behavior
        if (isChecked) {
          if (current.length < group.maxSelection) {
            return { ...prev, [groupId]: [...current, optionId] };
          }
          return prev; // Don't add if max reached
        } else {
          return { ...prev, [groupId]: current.filter(id => id !== optionId) };
        }
      }
    });
  };

  const calculatePrice = () => {
    let totalPrice = item.price;
    
    Object.entries(selectedModifiers).forEach(([groupId, optionIds]) => {
      const group = item.modifiers.find(g => g.id === groupId);
      if (group) {
        optionIds.forEach(optionId => {
          const option = group.options.find(o => o.id === optionId);
          if (option) {
            totalPrice += option.price;
          }
        });
      }
    });
    
    return totalPrice * quantity;
  };

  const canAddToCart = () => {
    // Check if all required modifiers are selected
    return item.modifiers.every(group => {
      if (!group.required) return true;
      const selected = selectedModifiers[group.id] || [];
      return selected.length > 0;
    });
  };

  const handleAddToCart = () => {
    if (!canAddToCart()) {
      toast({
        title: 'Missing required options',
        description: 'Please select all required options before adding to cart.',
        variant: 'destructive'
      });
      return;
    }

    addItem(item, quantity, selectedModifiers, specialInstructions);
    
    toast({
      title: 'Added to cart!',
      description: `${quantity}x ${item.name} added to your cart.`
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image */}
          {item.image && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Item Description */}
          <div>
            <p className="text-muted-foreground">{item.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-semibold text-lg">KES {item.price}</span>
              {item.calories && (
                <span className="text-sm text-muted-foreground">{item.calories} cal</span>
              )}
            </div>
            
            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}

            {/* Allergens */}
            {item.allergens.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium">Contains:</p>
                <p className="text-sm text-muted-foreground">{item.allergens.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Modifiers */}
          {item.modifiers.map(group => (
            <div key={group.id} className="space-y-3">
              <div>
                <h4 className="font-medium">
                  {group.name}
                  {group.required && <span className="text-destructive ml-1">*</span>}
                </h4>
                {group.maxSelection > 1 && (
                  <p className="text-sm text-muted-foreground">
                    Choose up to {group.maxSelection}
                  </p>
                )}
              </div>

              {group.maxSelection === 1 ? (
                <RadioGroup
                  value={selectedModifiers[group.id]?.[0] || ''}
                  onValueChange={(value) => handleModifierChange(group.id, value, true)}
                >
                  {group.options.map(option => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id}>{option.name}</Label>
                      </div>
                      {option.price > 0 && (
                        <span className="text-sm text-muted-foreground">
                          +KES {option.price}
                        </span>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {group.options.map(option => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={(selectedModifiers[group.id] || []).includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleModifierChange(group.id, option.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={option.id}>{option.name}</Label>
                      </div>
                      {option.price > 0 && (
                        <span className="text-sm text-muted-foreground">
                          +KES {option.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any special requests for this item..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="font-semibold text-lg">KES {calculatePrice()}</div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={!canAddToCart()}
          >
            Add to Cart - KES {calculatePrice()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemModal;