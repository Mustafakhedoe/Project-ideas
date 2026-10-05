export type MenuProduct = {
  id: string;
  name: string;
  category: "drank" | "ijs";
  description: string;
  price: number;
  image?: string;
};

export const drinks: MenuProduct[] = [
  {
    id: "cola",
    name: "Coca Cola",
    category: "drank",
    description: "Klassiek, koud en verfrissend.",
    price: 2.5,
    image: "/images/drankjes/coca-cola.png",
  },
  {
    id: "fanta",
    name: "Fanta",
    category: "drank",
    description: "Fruitige citrus smaak voor bij je pizza.",
    price: 2.5,
    image: "/images/drankjes/fanta.png",
  },
  {
    id: "water",
    name: "Water",
    category: "drank",
    description: "Fris en licht, perfect bij elke maaltijd.",
    price: 1.7,
    image: "/images/drankjes/spa.png",
  },
  {
    id: "ice-tea",
    name: "Iced Tea",
    category: "drank",
    description: "Verfrissende thee met een subtiele zoetheid.",
    price: 3.0,
    image: "/images/drankjes/ice tea.png",
  },
];

export const iceCreams: MenuProduct[] = [
  {
    id: "vanilla",
    name: "Vanille",
    category: "ijs",
    description: "Romige vanille met een zachte, frisse finish.",
    price: 3.5,
    image: "/images/pizzas/vanilla.png",
  },
  {
    id: "chocolade",
    name: "Chocolade",
    category: "ijs",
    description: "Rijk en romig, ideaal na een warme pizza.",
    price: 3.8,
    image: "/images/pizzas/choco.png",
  },
  {
    id: "aardbei",
    name: "Aardbei",
    category: "ijs",
    description: "Zoet, fruitig en verfrissend.",
    price: 3.6,
    image: "/images/pizzas/strawberry.png",
  },
  {
    id: "cookie-dough",
    name: "Cookie Dough",
    category: "ijs",
    description: "Een luxe dessert met zachte koekjesstukjes.",
    price: 4.2,
    image: "/images/pizzas/cookie.png",
  },
];

export default { drinks, iceCreams };
