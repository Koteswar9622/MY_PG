from fastapi import APIRouter, HTTPException
from backend.database.db import engine

router = APIRouter()

ROOM_TYPES = [
    {
        'id': 1,
        'room_type': '1 Share',
        'beds': 1,
        'ac_available': True,
        'price_per_month': '₹16,000',
        'description': 'AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 2,
        'room_type': '1 Share',
        'beds': 1,
        'ac_available': False,
        'price_per_month': '₹13,000',
        'description': 'Non-AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 3,
        'room_type': '2 Share',
        'beds': 2,
        'ac_available': True,
        'price_per_month': '₹13,000',
        'description': 'AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 4,
        'room_type': '2 Share',
        'beds': 2,
        'ac_available': False,
        'price_per_month': '₹9,000',
        'description': 'Non-AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 5,
        'room_type': '3 Share',
        'beds': 3,
        'ac_available': True,
        'price_per_month': '₹9,000',
        'description': 'AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 6,
        'room_type': '3 Share',
        'beds': 3,
        'ac_available': False,
        'price_per_month': '₹8,000',
        'description': 'Non-AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 7,
        'room_type': '4 Share',
        'beds': 4,
        'ac_available': True,
        'price_per_month': '₹7,500',
        'description': 'AC room with food, electricity, washing machine and laundry included.'
    },
    {
        'id': 8,
        'room_type': '4 Share',
        'beds': 4,
        'ac_available': False,
        'price_per_month': '₹9,000',
        'description': 'Non-AC room with food, electricity, washing machine and laundry included.'
    }
]


@router.get('/availability')
def get_availability():
    return ROOM_TYPES


@router.post('/allocate')
def allocate_room(payload: dict):
    room_id = payload.get('room_id')
    requested_by_role = payload.get('requested_by_role')
    if room_id is None:
        raise HTTPException(status_code=400, detail='room_id is required')

    if requested_by_role not in ('admin', 'super_admin'):
        raise HTTPException(status_code=403, detail='Only admins can allocate rooms')

    room = next((item for item in ROOM_TYPES if item['id'] == room_id), None)
    if room is None:
        raise HTTPException(status_code=404, detail='Room type not found')

    with engine.connect() as conn:
        conn.execute(
            "INSERT INTO public.allocations (tenant_id, bed_id, allocated_at, is_active) VALUES (NULL, NULL, now(), true)"
        )
        conn.commit()

    return {'message': f'Room allocated successfully: {room["room_type"]} {"AC" if room["ac_available"] else "Non-AC"}'}
