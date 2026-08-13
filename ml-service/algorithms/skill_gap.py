def calculate_skill_gap(required_skills, user_skills):
    """
    Calculates the skill gap between what a career requires and what a user has.
    
    required_skills: List of dicts [{'skillId': 'id1', 'minProficiency': 'Intermediate'}]
    user_skills: List of dicts [{'skillId': 'id1', 'proficiency': 'Beginner'}]
    
    Returns a list of missing or partially missing skills.
    """
    proficiency_levels = {
        "Beginner": 1,
        "Intermediate": 2,
        "Advanced": 3
    }
    
    user_skill_map = {
        skill['skillId']: proficiency_levels.get(skill['proficiency'], 0) 
        for skill in user_skills
    }
    
    missing_skills = []
    
    for req in required_skills:
        skill_id = req['skillId']
        req_level_str = req['minProficiency']
        req_level = proficiency_levels.get(req_level_str, 1)
        
        user_level = user_skill_map.get(skill_id, 0)
        
        if user_level < req_level:
            gap_amount = req_level - user_level
            missing_skills.append({
                "skillId": skill_id,
                "requiredProficiency": req_level_str,
                "currentProficiency": [k for k, v in proficiency_levels.items() if v == user_level][0] if user_level > 0 else "None",
                "gapScore": gap_amount
            })
            
    return missing_skills
