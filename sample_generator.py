import json
import random

streets = ["Rue de la Liberté", "Avenue des Roses", "Boulevard Voltaire", "Rue de la Paix", "Avenue des Champs-Élysées", "Rue du Commerce", "Avenue Victor Hugo", "Boulevard Haussmann", "Rue Saint-Honoré"]
cities = ["Paris", "New York", "London", "Tokyo", "Berlin", "Sydney", "Rome", "Moscow", "Dubai"]
countries = ["France", "USA", "UK", "Japan", "Germany", "Australia", "Italy", "Russia", "UAE"]
zip_codes = ["12345", "54321", "98765", "67890", "13579", "97531", "86420", "24680", "31415", "27182", "82845", "12345", "54321", "98765", "67890", "13579", "97531", "86420", "24680", "31415", "27182", "82845"]

TYPES = [
    "🍔 Restaurant",
    "🏛 Museum",
    "🌳 Park",
    "🍺 Bar",
    "❓ Other"
]
FOOD_TYPES = [
    "🍔 Fast Food",
    "🇫🇷 French",
    "🍕 Italian",
    "🎌 Japanese",
    "🌮 Mexican",
    "🌱 Vegetarian",
    "🌾 Vegan",
    "❓ Other"
]
STARS = [
    "⭐️",
    "⭐️⭐️",
    "⭐️⭐️⭐️",
    "⭐️⭐️⭐️⭐️",
    "⭐️⭐️⭐️⭐️⭐️"
]
PRICES = [
    "❌ Free",
    "💵",
    "💵💵",
    "💵💵💵",
    "💵💵💵💵",
    "💵💵💵💵💵"
]
ARTISTIC_CURRENTS = [
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
TYPES_OF_ART = [
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
PARK_TYPES = [
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
PRIVACYS = [
    "✅ Public",
    "⛔️ Private"
]
BAR_TYPES = [
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

def generate_address():
    type = random.choice(TYPES)
    street = random.choice(streets)
    number = random.randint(1, 100)
    city = random.choice(cities)
    country = random.choice(countries)
    zip_code = random.choice(zip_codes)
    address = {
        "placeName": f"{type} {street}",
        "address": f"{number} {street}",
        "city": city,
        "country": country,
        "zipCode": zip_code,
        "type": type,
        "price": random.choice(PRICES),
        "starRating": random.choice(STARS)
    }
    if type == "🍔 Restaurant":
        address["foodType"] = random.choice(FOOD_TYPES)
    elif type == "🏛 Museum":
        address["artisticCurrent"] = random.choice(ARTISTIC_CURRENTS)
        address["typeOfArt"] = random.choice(TYPES_OF_ART)
    elif type == "🌳 Park":
        address["parkType"] = random.choice(PARK_TYPES)
        address["privacy"] = random.choice(PRIVACYS)
    elif type == "🍺 Bar":
        address["barType"] = random.choice(BAR_TYPES)
    return address

addresses = [generate_address() for _ in range(10000)]

with open("generated_addresses.json", "w") as file:
    for address in addresses:
        file.write(json.dumps(address) + "\n")
