from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from backend.database.db import engine

router = APIRouter()

CITIES = [
    {"id": 1, "name": "Hyderabad", "slug": "hyderabad"},
    {"id": 2, "name": "Bengaluru", "slug": "bengaluru"},
    {"id": 3, "name": "Pune", "slug": "pune"},
    {"id": 4, "name": "Chennai", "slug": "chennai"},
    {"id": 5, "name": "Delhi", "slug": "delhi"},
    {"id": 6, "name": "Mumbai", "slug": "mumbai"},
]

PROPERTY_TYPES = [
    {"id": 1, "name": "PG/Hostels", "slug": "pg-hostels"},
    {"id": 2, "name": "Service Apartments", "slug": "service-apartments"},
    {"id": 3, "name": "Hotels/Lodges", "slug": "hotels-lodges"},
    {"id": 4, "name": "Rentals", "slug": "rentals"},
]

PROPERTIES = [
    {
        "id": 1,
        "title": "Premium AC PG in Banjara Hills",
        "city": "Hyderabad",
        "city_slug": "hyderabad",
        "property_type": "PG/Hostels",
        "type_slug": "pg-hostels",
        "price_per_month": "₹16,000",
        "beds": 1,
        "ac_available": True,
        "description": "Comfortable single share AC PG with meals, laundry, and Wi-Fi.",
        "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
        "rooms": [
            {"room_type": "1 Share", "beds": 1, "ac_available": True, "price_per_month": "₹16,000", "available": True},
            {"room_type": "2 Share", "beds": 2, "ac_available": True, "price_per_month": "₹13,000", "available": True},
        ],
    },
    {
        "id": 2,
        "title": "Secure PG near Koramangala",
        "city": "Bengaluru",
        "city_slug": "bengaluru",
        "property_type": "PG/Hostels",
        "type_slug": "pg-hostels",
        "price_per_month": "₹13,500",
        "beds": 2,
        "ac_available": False,
        "description": "Budget-friendly 2-share PG with CCTV, kitchen, and common lounge.",
        "image_url": "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
        "rooms": [
            {"room_type": "2 Share", "beds": 2, "ac_available": False, "price_per_month": "₹13,500", "available": True},
        ],
    },
    {
        "id": 3,
        "title": "Service Apartment in Pune City Center",
        "city": "Pune",
        "city_slug": "pune",
        "property_type": "Service Apartments",
        "type_slug": "service-apartments",
        "price_per_month": "₹28,000",
        "beds": 1,
        "ac_available": True,
        "description": "Fully furnished apartment with housekeeping, internet, and comfortable living area.",
        "image_url": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
        "rooms": [
            {"room_type": "Studio", "beds": 1, "ac_available": True, "price_per_month": "₹28,000", "available": True},
        ],
    },
    {
        "id": 4,
        "title": "Budget Rentals in South Delhi",
        "city": "Delhi",
        "city_slug": "delhi",
        "property_type": "Rentals",
        "type_slug": "rentals",
        "price_per_month": "₹22,000",
        "beds": 2,
        "ac_available": True,
        "description": "Affordable rental apartment near shopping and transit with all utilities included.",
        "image_url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        "rooms": [
            {"room_type": "2 Bedroom", "beds": 2, "ac_available": True, "price_per_month": "₹22,000", "available": True},
        ],
    },
    {
        "id": 5,
        "title": "Chennai Lodge with Home Comforts",
        "city": "Chennai",
        "city_slug": "chennai",
        "property_type": "Hotels/Lodges",
        "type_slug": "hotels-lodges",
        "price_per_month": "₹18,000",
        "beds": 1,
        "ac_available": True,
        "description": "Safe lodge with daily housekeeping and breakfast available.",
        "image_url": "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
        "rooms": [
            {"room_type": "Deluxe", "beds": 1, "ac_available": True, "price_per_month": "₹18,000", "available": True},
        ],
    },
]

@router.get("/cities")
def get_cities():
    return CITIES


@router.get("/property-types")
def get_property_types():
    return PROPERTY_TYPES


@router.get("/properties")
def list_properties(
    city: Optional[str] = Query(None),
    property_type: Optional[str] = Query(None),
    ac: Optional[bool] = Query(None),
    beds: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
):
    filtered = PROPERTIES

    if city:
        filtered = [item for item in filtered if item["city_slug"] == city.lower()]

    if property_type:
        filtered = [item for item in filtered if item["type_slug"] == property_type.lower()]

    if ac is not None:
        filtered = [item for item in filtered if item["ac_available"] == ac]

    if beds is not None:
        filtered = [item for item in filtered if item["beds"] == beds]

    if search:
        search_lower = search.lower()
        filtered = [
            item
            for item in filtered
            if search_lower in item["title"].lower()
            or search_lower in item["city"].lower()
            or search_lower in item["description"].lower()
        ]

    return filtered


@router.get("/properties/{property_id}")
def get_property(property_id: int):
    property_item = next((item for item in PROPERTIES if item["id"] == property_id), None)
    if property_item is None:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_item
