import pandas as pd
import numpy as np
import random

# Global complexity dictionary
complexity_dict = {}

def load_complexity_dict(filepath='compdict16.csv'):
    """Load the complexity dictionary from CSV"""
    global complexity_dict
    df = pd.read_csv(filepath)
    complexity_dict = dict(zip(df['Pattern'], df['Complexity']))
    print(f"Loaded {len(complexity_dict)} pattern complexities")
    return complexity_dict

def pattern_to_int(pattern):
    """Convert binary pattern array to integer"""
    pattern_str = ''.join(str(int(x)) for x in pattern)
    return int(pattern_str, 2)

def get_pattern_complexity(pattern):
    """Get complexity score for a pattern"""
    pattern_int = pattern_to_int(pattern)
    return complexity_dict[pattern_int]

def select_pattern_by_complexity_range(patterns, complexity_level=0.5):
    """
    Select random pattern within a complexity range based on complexity_level (0.0 to 1.0)
    
    If complexity_level >= 0.5:
        Select randomly from patterns between (complexity_level * max_complexity) and max_complexity
    If complexity_level < 0.5:
        Select randomly from patterns between min_complexity and (complexity_level * max_complexity)
    """
    # Get all patterns with their complexities
    patterns_with_comp = []
    for pattern in patterns:
        complexity = get_pattern_complexity(pattern)
        patterns_with_comp.append({
            'pattern': pattern,
            'complexity': complexity
        })
    
    # Get min and max complexity
    complexities = [p['complexity'] for p in patterns_with_comp]
    min_complexity = min(complexities)
    max_complexity = max(complexities)
    
    print(f"Complexity range: {min_complexity:.4f} to {max_complexity:.4f}")
    
    # Define the complexity range based on slider position
    if complexity_level >= 0.5:
        # Upper range: from (complexity_level * max) to max
        lower_bound = complexity_level * max_complexity
        upper_bound = max_complexity
        print(f"Upper range mode: {lower_bound:.4f} to {upper_bound:.4f}")
    else:
        # Lower range: from min to (complexity_level * max)
        lower_bound = min_complexity
        upper_bound = complexity_level * max_complexity
        print(f"Lower range mode: {lower_bound:.4f} to {upper_bound:.4f}")
    
    # Filter patterns within the complexity range
    filtered_patterns = [
        p for p in patterns_with_comp 
        if lower_bound <= p['complexity'] <= upper_bound
    ]
    
    # If no patterns in range (edge case), fall back to all patterns
    if not filtered_patterns:
        print("Warning: No patterns in range, using all patterns")
        filtered_patterns = patterns_with_comp
    
    print(f"Patterns in range: {len(filtered_patterns)} out of {len(patterns_with_comp)}")
    
    # Randomly select from filtered patterns
    selected = random.choice(filtered_patterns)
    
    return selected['pattern'], selected['complexity']