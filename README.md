# 📊 Hello bench

A minimal and extensible project to **benchmark web frameworks and languages** using:

- 🧪 [K6](https://k6.io/) for load testing  
- 📈 [Grafana](https://grafana.com/) for visualization  
- 📦 [InfluxDB](https://www.influxdata.com/) for time-series storage  
- 🐳 Docker Compose for orchestration


## 🎯 Goals

- Compare **response time**, **throughput**, and **resource usage**
- Evaluate trade-offs between **runtime performance**, **developer ergonomics**, and **deployment simplicity**
- Provide a consistent test environment across languages and frameworks


## 🚀 How to Run

### 1. Start all services

    docker-compose up --build

### 2. View results
 
Grafana available at: http://localhost:3000/d/XKhgaUpiks/k6-dashboard 


## 🎯 Benchmarked Targets

| Framework          | Language | Port  | 
|--------------------|----------|-------|
| FastAPI (uvicorn)  | Python   | 8000  | 
| FastAPI (gunicorn) | Python   | 8001  | 
| Flask              | Python   | 8002  | 
| Django             | Python   | 8003  | 
| Actix              | Rust     | 8004  | 
| Fiber              | Go       | 8005  | 


## 📌 Requirements

- Docker & Docker Compose
