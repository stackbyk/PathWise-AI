from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

class ResourceRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
    def recommend_resources(self, user_needs_text, resources_data, top_k=3):
        """
        Recommends top_k resources based on cosine similarity to the user's needs.
        
        user_needs_text: A string representing what the user needs to learn (e.g. "React state management hooks")
        resources_data: List of dicts [{'id': 'res1', 'text': 'Learn React hooks...', 'skillId': '...'}, ...]
        """
        if not resources_data:
            return []
            
        # Prepare corpus: first document is the query, the rest are the resources
        corpus = [user_needs_text] + [res['text'] for res in resources_data]
        
        # Vectorize
        tfidf_matrix = self.vectorizer.fit_transform(corpus)
        
        # Calculate cosine similarity between query (index 0) and all resources (index 1 to end)
        cosine_similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
        
        # Rank the resources based on similarity score
        ranked_indices = cosine_similarities.argsort()[::-1]
        
        recommendations = []
        for idx in ranked_indices[:top_k]:
            if cosine_similarities[idx] > 0: # Only recommend if there is some similarity
                res = resources_data[idx].copy()
                res['similarity_score'] = float(cosine_similarities[idx])
                recommendations.append(res)
                
        return recommendations
