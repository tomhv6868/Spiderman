from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.agent import summarize_documentation

app = FastAPI(title="Build Repo Lab Guide API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SummaryRequest(BaseModel):
    url: str


@app.get("/")
def home():
    return {
        "message": "Backend is running."
    }


@app.post("/api/summarize")
def summarize(request: SummaryRequest):
    try:
        return summarize_documentation(request.url)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(
            status_code=502,
            detail="Unable to fetch or summarize the documentation."
        ) from error
