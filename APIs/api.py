from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import os

# LangChain and LLM setup
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

# Store page visits in memory (for demo; use DB for production)
user_page_visits: Dict[str, int] = {}

# Use your provided key
os.environ["OPENAI_API_KEY"] = "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"

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VisitModel(BaseModel):
    username: str

class RecommendationRequest(BaseModel):
    username: str

@app.post("/visit")
async def record_visit(data: VisitModel):
    username = data.username
    user_page_visits[username] = user_page_visits.get(username, 0) + 1
    return {"visits": user_page_visits[username]}

@app.post("/recommendation")
async def get_recommendation(data: RecommendationRequest):
    username = data.username
    visits = user_page_visits.get(username, 0)

    # Prompt for LangChain LLM
    prompt = PromptTemplate(
        input_variables=["username", "visits"],
        template=(
            "You are an AI study coach for a math learning platform. "
            "The student {username} has visited the AI Recommendation page {visits} times. "
            "Based on this, suggest a personalized next step or tip to help them improve their math learning journey. "
            "Be encouraging and specific. If visits are high, suggest advanced topics or challenges. "
            "If visits are low, suggest basic tips or motivation."
        ),
    )

    llm = OpenAI(temperature=0.7, model_name="gpt-3.5-turbo")  # Or use the correct model for your key

    try:
        suggestion = llm(prompt.format(username=username, visits=visits))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")

    return {"suggestion": suggestion, "visits": visits}
