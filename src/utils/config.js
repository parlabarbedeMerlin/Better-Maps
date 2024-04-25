
export const protectedUrls = {
  profile: /^\/profile.*$/gu,
  add: /^\/add.*$/gu,
}

export const Types = [
  "🍔 Restaurant",
  "🏛 Museum",
  "🌳 Park",
  "🍺 Bar",
  "❓ Other"
]
export const FoodTypes = [
  "🍔 Fast Food",
  "🇫🇷 French",
  "🍕 Italian",
  "🎌 Japanese",
  "🌮 Mexican",
  "🌱 Vegetarian",
  "🌾 Vegan",
  "❓ Other"
]
export const Stars = [
  "⭐️",
  "⭐️⭐️",
  "⭐️⭐️⭐️",
  "⭐️⭐️⭐️⭐️",
  "⭐️⭐️⭐️⭐️⭐️"
]
export const Prices = [
  "❌ Free",
  "💵",
  "💵💵",
  "💵💵💵",
  "💵💵💵💵",
  "💵💵💵💵💵"
]
export const ArtisticCurrents = [
  "🎨 Baroque",
  "🎨 Classicism",
  "🎨 Cubism",
  "🎨 Dadaism",
  "🎨 Expressionism",
  "🎨 Impressionism",
  "🎨 Modernism",
  "🎨 Realism",
  "🎨 Romanticism",
  "🎨 Surrealism",
  "🎨 Other"
]
export const TypesOfArt = [
  "🖼 Painting",
  "🗿 Sculpture",
  "🎨 Drawing",
  "📷 Photography",
  "🎭 Performance",
  "💻 Digital",
  "🎭 Theater",
  "🎼 Music",
  "📚 Literature",
  "🎥 Cinema",
  "🎨 Other"
]
export const ParkTypes = [
  "🌳 Forest",
  "🏞 National Park",
  "🏖 Beach",
  "🏕 Campsite",
  "🌸 Garden",
  "🏟 Playground",
  "🏛 Monument",
  "🏗 Construction",
  "🏝 Island",
  "🏜 Desert",
  "🏔 Mountain",
  "🏙 City",
  "🏞 Other"
]
export const Privacys = [
  "✅ Public",
  "⛔️ Private"
]
export const BarTypes = [
  "🍺 Beer",
  "🍷 Wine",
  "🍸 Cocktail",
  "🥃 Whiskey",
  "🍹 Mocktail",
  "🍾 Champagne",
  "🍶 Sake",
  "🍵 Tea",
  "☕️ Coffee",
  "🥤 Soft Drink"
]
export const AddInitialValues = {
  placeName: "",
  type: Types[3],
  address: "",
  zipCode: "",
  city: "",
  country: "",
  foodType: FoodTypes[0],
  starRating: Stars[0],
  price: Prices[0],
  artisticCurrent: ArtisticCurrents[0],
  typeOfArt: TypesOfArt[0],
  parkType: ParkTypes[0],
  privacy: Privacys[0],
  barType: BarTypes[0]
}
