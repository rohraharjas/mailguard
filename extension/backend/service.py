from transformers import pipeline
from fastapi import FastAPI, HTTPException, Request

app = FastAPI()
pipe = pipeline("text-classification", model="cybersectony/phishing-email-detection-distilbert_v2.1")
print("Pipeline loaded successfully")

@app.get("/predict")
async def predict(req: Request):
    if not req.headers:
        raise HTTPException(status_code=400, detail="Text input is required")
    
    try:
        text = req.headers.get("X-Email-Text")
        result = pipe(text)
        return {"label": result[0]['label'], "score": result[0]['score']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))