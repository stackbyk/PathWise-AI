import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

class Neo4jConnection:
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI")
        self.user = os.getenv("NEO4J_USERNAME")
        self.pwd = os.getenv("NEO4J_PASSWORD")
        self.driver = None
        try:
            if self.uri and self.user and self.pwd:
                self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.pwd))
        except Exception as e:
            print("Failed to create the driver:", e)
        
    def close(self):
        if self.driver is not None:
            self.driver.close()
            
    def get_session(self):
        if self.driver:
            return self.driver.session()
        return None

neo4j_conn = Neo4jConnection()
