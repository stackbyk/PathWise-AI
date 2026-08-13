from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from app.database import neo4j_conn
from algorithms.skill_gap import calculate_skill_gap
from algorithms.graph_utils import get_topological_sort
from algorithms.ml_recommender import ResourceRecommender

router = APIRouter()
recommender = ResourceRecommender()

class SkillGapRequest(BaseModel):
    required_skills: List[Dict[str, str]]
    user_skills: List[Dict[str, str]]

class RoadmapRequest(BaseModel):
    missing_skills: List[str]

class RecommendRequest(BaseModel):
    user_needs: str
    resources: List[Dict[str, Any]]

@router.post("/skill-gap")
def api_skill_gap(req: SkillGapRequest):
    try:
        gap = calculate_skill_gap(req.required_skills, req.user_skills)
        return {"missing_skills": gap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/topological-order")
def api_topological_order(req: RoadmapRequest):
    try:
        # Fetch edges from Neo4j
        session = neo4j_conn.get_session()
        if not session:
            raise HTTPException(status_code=500, detail="Neo4j connection failed")
            
        result = session.run("MATCH (a:Skill)-[:REQUIRES]->(b:Skill) RETURN a.id AS source, b.id AS target")
        edges = [(record["source"], record["target"]) for record in result]
        session.close()
        
        # Determine the order for the requested missing skills
        order = get_topological_sort(edges, subset_nodes=req.missing_skills)
        return {"order": order}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend-resources")
def api_recommend_resources(req: RecommendRequest):
    try:
        recommendations = recommender.recommend_resources(req.user_needs, req.resources, top_k=3)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
