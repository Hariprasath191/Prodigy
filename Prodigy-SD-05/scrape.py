import requests
from bs4 import BeautifulSoup
import csv

# Target URL (replace with the e-commerce website URL you want to scrape)
URL = "https://www.example.com/search?q=laptops"  # Example URL

# Headers to mimic a real browser request
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Accept-Language": "en-US, en;q=0.9"
}

# Function to scrape product information
def scrape_products(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print("Failed to retrieve the webpage")
        return []

    soup = BeautifulSoup(response.content, "html.parser")

    # Replace the following selectors based on the website's HTML structure
    product_names = soup.select(".product-title")  # Replace with the correct class
    product_prices = soup.select(".product-price")  # Replace with the correct class
    product_ratings = soup.select(".product-rating")  # Replace with the correct class

    # Collect the product information
    products = []
    for name, price, rating in zip(product_names, product_prices, product_ratings):
        products.append({
            "name": name.text.strip(),
            "price": price.text.strip(),
            "rating": rating.text.strip()
        })
    return products

# Save data to a CSV file
def save_to_csv(products, filename="products.csv"):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=["name", "price", "rating"])
        writer.writeheader()
        writer.writerows(products)
    print(f"Data saved to {filename}")

# Main execution
if __name__ == "__main__":
    products = scrape_products(URL)
    if products:
        save_to_csv(products)
