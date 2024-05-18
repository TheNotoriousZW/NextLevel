FROM python:3.11

WORKDIR /app

COPY . .

RUN pip3 install --no-cache-dir -r requirements.txt


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--proxy-headers", "--port", "8000"]
