# PathWise AI — Interactive Career Roadmap Builder

An AI-Powered Interactive Roadmap Builder that helps students choose a career goal, assesses their existing skills, identifies skill gaps, and automatically generates a personalized learning roadmap using prerequisite relationships, graph algorithms, and machine-learning-based recommendations.

## Features

- **Career Exploration:** Browse and select technical career goals.
- **Skill Assessment:** Evaluate your current skills and proficiencies.
- **Skill-Gap Analysis:** Identifies the exact skills you need to learn.
- **Personalized Roadmap Generation:** Uses Topological Sorting to build a valid learning sequence based on skill prerequisites.
- **Interactive UI:** Visualize your learning path as a dynamic DAG (Directed Acyclic Graph) using React Flow.
- **AI Recommendations:** Recommends learning resources using TF-IDF and Cosine Similarity.
- **Gamification:** Earn XP, badges, and maintain learning streaks by completing nodes and quizzes.
- **Admin Dashboard:** Manage careers, skills, resources, and view platform statistics.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Flow, Framer Motion, Recharts
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT Authentication
- **ML Service:** Python, FastAPI, scikit-learn, NetworkX
- **Databases:** MongoDB (Document Store), Neo4j (Graph Database for skill dependencies)

## Architecture & Algorithms

### Skill Gap Analysis
The system calculates `Missing Skills = Required Skills (for Career) - User Skills`. It accounts for proficiency levels, generating partial skill gaps if a user has a beginner understanding of an advanced requirement.

### TF-IDF & Cosine Similarity
To recommend resources, the ML service vectorizes resource descriptions, user needs, and skill descriptions using Term Frequency-Inverse Document Frequency (TF-IDF). It then calculates the Cosine Similarity to find the most relevant learning resources for the generated skill gap.

### DAG & Topological Sorting
Skill prerequisites (e.g., `JavaScript -> React -> Node.js`) are stored as relationships in Neo4j. The system constructs a Directed Acyclic Graph (DAG) and performs cycle detection and Topological Sorting to guarantee a valid, progressive learning order.

## Setup Instructions

1. Clone the repository.
2. Rename `.env.example` to `.env` and fill in your MongoDB and Neo4j credentials.
3. Install dependencies:
   - Client: `cd client && npm install`
   - Server: `cd server && npm install`
   - ML Service: `cd ml-service && python -m venv venv && .\venv\Scripts\activate && pip install -r requirements.txt` (Note: run `pip install fastapi uvicorn scikit-learn networkx pandas neo4j python-dotenv` if requirements.txt is missing)
4. Run the components:
   - Server: `cd server && npm run dev` (Runs on port 5000)
   - ML Service: `cd ml-service && uvicorn main:app --reload` (Runs on port 8000)
   - Client: `cd client && npm run dev` (Runs on port 5173)

## Demo Credentials
- **Student Demo:** Email: `student@example.com` | Password: `Student@123`
- **Admin Demo:** Email: `admin@example.com` | Password: `Admin@123`
