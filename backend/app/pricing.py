"""Quote engine mirroring the landing-page estimator. Tune the constants below."""
USD_INR = 84.75
CITY_FACTOR = {"Bengaluru": 1.0, "Hyderabad": 0.95, "Delhi NCR": 1.05, "Pune": 0.9, "Chennai": 0.9}
AEGIS_RATE = 0.08            # % of monthly rent, billed monthly
SPARSH_BASE_USD = {"essential": 59, "comprehensive": 118, "full": 210}
SYNERGY_DISCOUNT = 0.15
INR_PER_USD = {"USD": 1, "GBP": 0.79, "AED": 3.67, "AUD": 1.52, "CAD": 1.36}

def build_quote(city, aegis, sparsh, rent_inr, tier, currency="USD"):
    f = CITY_FACTOR.get(city, 1.0)
    aegis_usd = round((rent_inr / USD_INR) * AEGIS_RATE * f) if aegis else 0
    sparsh_usd = round(SPARSH_BASE_USD.get(tier, 118) * f) if sparsh else 0
    discount = round((aegis_usd + sparsh_usd) * SYNERGY_DISCOUNT) if (aegis and sparsh) else 0
    net = aegis_usd + sparsh_usd - discount
    protection = round(rent_inr / USD_INR * 12 * 0.375) if aegis else 0
    if sparsh and not aegis:
        protection = round(sparsh_usd * 12 * 2)
    rate = INR_PER_USD.get(currency, 1)
    return {
        "city": city, "currency": currency,
        "aegis_usd": aegis_usd, "sparsh_usd": sparsh_usd, "discount_usd": discount, "net_usd": net,
        "net_local": round(net * rate), "protection_usd": protection,
    }
