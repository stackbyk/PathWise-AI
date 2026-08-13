import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '../../.env')
load_dotenv(dotenv_path=env_path)

URI = os.getenv("NEO4J_URI")
USER = os.getenv("NEO4J_USERNAME")
PWD = os.getenv("NEO4J_PASSWORD")

def seed_neo4j():
    if not URI or not USER or not PWD:
        print("Neo4j credentials missing")
        return
        
    driver = GraphDatabase.driver(URI, auth=(USER, PWD))
    
    with driver.session() as session:
        # Clear existing
        session.run("MATCH (n) DETACH DELETE n")
        
        # Create Nodes
        skills = ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs']
        for s in skills:
            session.run("CREATE (:Skill {id: $id, name: $name})", id=s, name=s)
            
        # Create Relationships
        edges = [
            ('HTML/CSS', 'JavaScript'),
            ('JavaScript', 'React'),
            ('JavaScript', 'Node.js'),
            ('Node.js', 'Express.js'),
            ('Node.js', 'REST APIs'),
            ('Express.js', 'REST APIs'),
            ('MongoDB', 'REST APIs')
        ]
        
        for source, target in edges:
            query = """
            MATCH (a:Skill {id: $source})
            MATCH (b:Skill {id: $target})
            MERGE (a)-[:REQUIRES]->(b)
            """
            session.run(query, source=source, target=target)
            
        print("Neo4j seeded successfully!")
        
    driver.close()

if __name__ == "__main__":
    seed_neo4j()
