const products = [
  {
    id: "havit-st7164",
    brand: "HAVIT",
    name: "ST7164 Mobile Phone Stand",
    price: "",
    image: "havit 1.jfif",
    category: "Mobile Accessories",
    description: "A practical phone stand for your desk and everyday use.",
    specifications: []
  },
  {
    id: "oneplus-bullets-z2-anc",
    brand: "OnePlus",
    name: "Bullets Wireless Z2 ANC Neckband",
    price: "2900",
    image: "OnePlus Bullets 1.jpg",
    category: "Audio",
    description: "A convenient wireless neckband for listening to music and enjoying audio on the go.",
    specifications: [
      "Product type: Wireless neckband",
      "Noise cancellation: ANC"
    ]
  },
  {
    id: "awei-pa92",
    brand: "Awei",
    name: "PA-92 20000mAh 22.5W Fast Charging Power Bank",
    price: "1500",
    image: "Awei PA-92 1.jpg",
    category: "Power Banks",
    description: "A 20000mAh portable power bank with 22.5W charging for convenient battery backup while travelling or out and about.",
    specifications: [
      "Capacity: 20000mAh",
      "Charging power: 22.5W"
    ]
  },
  {
    id: "foneng-px106",
    brand: "Foneng",
    name: "PX106 10000mAh 22.5W Power Bank",
    price: "1350",
    image: "Foneng PX106 10000mAh.jpg",
    category: "Power Banks",
    description: "A compact 10000mAh power bank with 22.5W charging and built-in Type-C and iP cables for everyday convenience.",
    specifications: [
      "Capacity: 10000mAh",
      "Charging power: 22.5W",
      "Built-in cables: Type-C and iP"
    ]
  },
  {
    id: "hoco-eq2",
    brand: "Hoco",
    name: "EQ2 Wireless Earbuds",
    price: "1000",
    image: "Hoco EQ2 2.jpg",
    category: "Audio",
    description: "Compact wireless earbuds for music and everyday listening, supplied with a convenient charging case.",
    specifications: [
      "Product type: Wireless earbuds",
      "Charging case: Included"
    ]
  },
  {
    id: "ugreen-usb-typec-cable",
    brand: "UGREEN",
    name: "USB Male to Type-C Data Cable (0.25m, Black)",
    price: "270",
    image: "UGREEN USB Male to Type-C 0.25 Meter Black Data Cable.jfif",
    category: "Cables & Adapters",
    description: "A compact cable for everyday charging and data transfer.",
    specifications: [
      "Length: 0.25 metre",
      "Connectors: USB-A to Type-C",
      "Colour: Black"
    ]
  },
  {
    id: "hoco-ua17",
    brand: "HOCO",
    name: "UA17 Type-C to USB Adapter",
    price: "240",
    image: "Hoco UA17 Adapter.jfif",
    category: "Cables & Adapters",
    description: "A handy adapter for connecting compatible USB devices to a Type-C port.",
    specifications: [
      "Connection: Type-C to USB"
    ]
  }
];
// Allow GitHub Actions to read the catalogue
if (typeof module !== "undefined") {
  module.exports = products;
}