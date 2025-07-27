## 🛡️ Phishing Email Detection API (FastAPI + Transformers)
This is a lightweight FastAPI-based service that uses a HuggingFace Transformers model to detect whether a given email text is a phishing attempt.

It is powered by the model cybersectony/phishing-email-detection-distilbert_v2.1 and can be used as a backend for email security tools or browser extensions.

## 🚀 Features
- FastAPI REST endpoint

- Real-time phishing prediction from email text

- HuggingFace Transformers integration

- Plug-and-play with browser extensions or security tools

## 🧠 Model Used
Model: cybersectony/phishing-email-detection-distilbert_v2.1
A fine-tuned DistilBERT model trained specifically to distinguish phishing from non-phishing email content.

## 📦 Setup & Installation
### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/phishing-detector-api
```
### 2. (Optional) Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
### 3. Install dependencies
```bash
pip install -r extension/backend/requirements.txt
```

## ⚙️ Running the API
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## 🔍 API Usage
### Endpoint
- GET /predict

## Request
Send the email content as a custom header:

X-Email-Text: <email body text>

Example (using curl)
```bash
curl -X GET http://localhost:8000/predict \
  -H "X-Email-Text: Urgent! Your account has been suspended. Click here to verify your identity."
```
Response
```json
{
  "label": "PHISHING",
  "score": 0.9745
}
```
## 🔐 Security Notes
This API is intended for development and educational purposes. In production environments, consider adding:

- Rate limiting

- Authentication

- Input validation & size limits

- Abuse detection/logging

## 🔗 Potential Integrations
Email security gateways

Developer tools for security awareness

Admin dashboards for real-time phishing analytics

## 🧪 Testing
You can test the API using:

- curl

- Postman or Insomnia

- A frontend browser extension (see /extensions folder if available)


## ✨ Credits
Built with FastAPI

Powered by Hugging Face Transformers

Model by cybersectony

