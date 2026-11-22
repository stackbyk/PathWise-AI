from fastapi import FastAPI
from app.database import neo4j_conn
from routes import ml_routes

app = FastAPI(title="PathWise AI ML Service")

@app.on_event("startup")
async def startup_event():
    print("Starting ML Service...")

@app.on_event("shutdown")
async def shutdown_event():
    neo4j_conn.close()
    print("Shutting down ML Service...")

@app.get("/")
def read_root():
    return {"message": "PathWise AI ML Service is running."}

@app.get("/api/health")
def health_check():
    session = neo4j_conn.get_session()
    neo4j_status = "connected" if session else "disconnected"
    if session:
        session.close()
    return {"status": "ok", "neo4j": neo4j_status}

app.include_router(ml_routes.router, prefix="/api/ml")
