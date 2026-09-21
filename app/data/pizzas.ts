export type Pizza = {
  id: string;
  name: string;
  category: "vegetarian" | "meat" | "fish";
  description: string;
  prices: { medium: number; large: number; calzone: number };
  image?: string;
};

export const pizzas: Pizza[] = [
  {
    id: "margherita",
    name: "Margherita",
    category: "vegetarian",
    description: "Tomatensaus, mozzarella, verse basilicum.",
    prices: { medium: 7.5, large: 10.5, calzone: 9.5 },
    image: "/images/pizzas/margherita.png",
  },
  {
    id: "veggie-deluxe",
    name: "Veggie Deluxe",
    category: "vegetarian",
    description: "Tomaat, mozzarella, paprika, olijven, champignons.",
    prices: { medium: 8.5, large: 11.5, calzone: 10.5 },
    image: "/images/pizzas/veggie.png",
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    category: "meat",
    description: "Tomatensaus, mozzarella en pittige pepperoni.",
    prices: { medium: 9.0, large: 12.0, calzone: 11.0 },
    image: "/images/pizzas/pepperoni.png",
  },
  {
    id: "bbq-chicken",
    name: "BBQ Chicken",
    category: "meat",
    description: "Kip, barbecuesaus, rode ui en mais.",
    prices: { medium: 9.5, large: 12.5, calzone: 11.5 },
    image: "/images/pizzas/bbq.png",
  },
  {
    id: "tuna",
    name: "Tonno",
    category: "fish",
    description: "Tonijn, ui, mozzarella en tomatensaus.",
    prices: { medium: 9.0, large: 12.0, calzone: 11.0 },
    image: "/images/pizzas/tonno.png",
  },
  {
    id: "frutti-di-mare",
    name: "Frutti di Mare",
    category: "fish",
    description: "Garnalen, mosselen en zeevruchtenmix.",
    prices: { medium: 10.5, large: 13.5, calzone: 12.5 },
    image: "/images/pizzas/frutti.png",
  },
];

export default pizzas;
