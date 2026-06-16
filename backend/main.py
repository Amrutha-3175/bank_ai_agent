from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Bank AI Backend Running"}

@app.post("/chat")
def chat(request: ChatRequest):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_completion_tokens=120,
        temperature=0.5,
        messages=[
            {
                "role": "system",
                "content": """
                You are BankAI, an AI Banking Assistant.

                Rules:
                1. Give short and concise responses.
                2. Keep answers within 3-5 lines.
                3. Use simple language.
                4. Focus only on banking, loans, EMI, KYC and finance.
                5. For eligibility questions, provide a brief recommendation.
                6. Avoid long explanations unless specifically requested.
                """
            },
            {
                "role": "user",
                "content": request.message
            }
        ]
    )

    return {
        "response": response.choices[0].message.content
    }

    return {
        "response":
        response.choices[0].message.content
    }