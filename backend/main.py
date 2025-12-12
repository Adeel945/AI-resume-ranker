from fastapi import FastAPI
from pydantic import BaseModel
import base64
from openai import OpenAI

app = FastAPI()

client = OpenAI()

class RankRequest(BaseModel):
    jd: str
    cv: str

@app.post("/api/rank")
async def rank(req: RankRequest):
    cv_text = base64.b64decode(req.cv).decode()

    prompt = f"""
    Job Description:
    {req.jd}

    Candidate CV:
    {cv_text}

    Task: Rate how well the CV matches the job description.
    Provide a score from 0 to 100 and a short explanation.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.choices[0].message["content"]
    return {"result": result}
