from fastapi import APIRouter, UploadFile, File, Form, Depends
from typing import Optional
from fastapi.responses import JSONResponse
from backend.ai.body_estimation import body_ai

router = APIRouter()

@router.post("/analyze/")
async def analyze_body(
    image: UploadFile = File(...),
    height: float = Form(...),  # cm
    weight: float = Form(...),  # kg
    user_id: Optional[int] = Form(None)
):
    """
    Recibe foto + altura (cm) y peso (kg). 
    Devuelve estimación corporal, porcentaje graso, etc.
    """
    image_bytes = await image.read()
    result = body_ai.analyze_image(image_bytes, height, weight)
    
    return JSONResponse(content={"success": True, **result})

@router.post("/generate_routine/")
async def generate_routine(
    user_id: int = Form(...),
    goal: str = Form(...),            # fuerza, perder grasa, mantener
    level: str = Form(...),           # principiante, intermedio, avanzado
    frequency: int = Form(...),       # entrenos/semana
):
    """
    Recibe datos del usuario, objetivo y preferencia. Devuelve rutina personalizada.
    """
    # TODO: Llamada real al motor de generación (AI/modelo)
    routine = {
        "routine_id": 1,
        "workouts": [
            {"day": 1, "exercises": ["Sentadillas", "Push-ups", "Plank"]},
            {"day": 2, "exercises": ["Zancadas", "Pull-ups", "Crunches"]},
            # ...
        ]
    }
    return JSONResponse(content=routine)
