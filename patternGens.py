import numpy as np
import itertools


def Family_Theorem(metric_level, pattern=[]):
    pattern_size = len(pattern)
    Family = []
    metric_stride = int(16*metric_level)
    num_of_strides = int(len(pattern)/metric_stride)
    #Check for ODD strides
    #if (math.log(len(pattern), 2).is_integer()):
    for i in range(num_of_strides):
            if(pattern[i*metric_stride]==1 or pattern[i*metric_stride]==2):
                Family.append('N')
            if(pattern[i*metric_stride]==0):
                if(i==0):
                    Family.append('O')
                j = int(i*metric_stride - metric_stride/2)
                if(j>0):
                    if(pattern[j]==1 or pattern[j]==2):
                            Family.append('S')
                    else:
                        Family.append('O')
    return Family

def new_patterns(metric_level, pattern=[]):
    pattern_fam = np.asarray(Family_Theorem(metric_level, pattern))
    N_pos = np.where(pattern_fam == 'N')[0] 
    S_pos = np.where(pattern_fam=='S')[0]
    O_pos = np.where(pattern_fam =='O')[0]
    pattern = np.asarray(pattern)
    onsets = np.where(pattern==1)[0]
    #Permutations given X how many ways can I arrange x 
    #COMBINATIONS given x in K, how many ways can I arrange them.
    N_pos_valid = list(int(metric_level*16)*N_pos)
    comb_of_beats = []
    stuff = N_pos_valid
    for L in range(len(N_pos_valid) + 1):
        for subset in itertools.combinations(stuff, L):
            if 'O' in subset:
                continue
            else:
                if(np.size(np.asarray(subset))==0):
                    continue
                comb_of_beats.append(np.asarray(subset))
    patterns=[]
    pattern_real = pattern
    for i in comb_of_beats:
        pattern_tmp = np.copy(pattern)
        for j in i:
            try:
                if(pattern_tmp[j+2]==0):
                    continue
            except:
                continue
            pattern_tmp[j+1] = 1
        patterns.append(pattern_tmp)
    O_pos_valid = list(int(metric_level*16)*O_pos)
    comb_of_beats = []
    stuff = O_pos_valid
    for L in range(len(O_pos_valid) + 1):
        for subset in itertools.combinations(stuff, L):
            if 'N' in subset:
                continue
            else:
                if(np.size(np.asarray(subset))==0):
                    continue
                comb_of_beats.append(np.asarray(subset))
    pattern_real = pattern
    for i in comb_of_beats:
        pattern_tmp = np.copy(pattern)
        for j in i:
            try:
                if(pattern_tmp[j+2]==1):
                    pattern_tmp[j+1] = 1
                else:
                    continue
            except:
                continue
        patterns.append(pattern_tmp)
    S_pos_valid = list(int(metric_level*16)*S_pos)
    comb_of_beats = []
    stuff = S_pos_valid
    for L in range(len(S_pos_valid) + 1):
        for subset in itertools.combinations(stuff, L):
            if 'O' in subset:
                continue
            else:
                if(np.size(np.asarray(subset))==0):
                    continue
                comb_of_beats.append(np.asarray(subset))
    pattern_real = pattern
    for i in comb_of_beats:
        pattern_tmp = np.copy(pattern)
        for j in i:
            try:
                if(pattern_tmp[j+2]==1):
                    if(pattern_tmp[j+1]==0):
                        pattern_tmp[j+1] = 1
                    elif(pattern_tmp[j+1]==1):
                        pattern_tmp[j+1]=0
                    
                else:
                    continue
            except:
                continue
        patterns.append(pattern_tmp)
    
    
    patterns = np.asarray(patterns)
    patterns = np.unique(patterns, axis=0)
    
    
    
    return N_pos,S_pos,O_pos,onsets,comb_of_beats,patterns

def new_patternsanti(metric_level, pattern=[]):
    # Get the original family using THE SAME metric level
    original_fam = np.asarray(Family_Theorem(metric_level, pattern))
    
    print("Original family:", original_fam)
    
    # Transform the family: N->O, O->S, S->N
    transformed_fam = []
    for element in original_fam:
        if element == 'N':
            transformed_fam.append('O')
        elif element == 'O':
            transformed_fam.append('S')
        elif element == 'S':
            transformed_fam.append('N')
    
    transformed_fam = np.asarray(transformed_fam)
    print("Transformed family:", transformed_fam)
    
    # Now create a NEW pattern that would produce this transformed family
    pattern_size = len(pattern)
    metric_stride = int(16*metric_level)
    
    new_pattern = np.zeros(pattern_size, dtype=int)
    
    for i, fam_type in enumerate(transformed_fam):
        metric_pos = i * metric_stride
        syncopated_pos = int(metric_pos - metric_stride/2)
        
        if fam_type == 'N':
            # Place beat on metric position to create 'N'
            if metric_pos < pattern_size:
                new_pattern[metric_pos] = 1
                
        elif fam_type == 'S':
            # Place beat at syncopated position to create 'S'
            if syncopated_pos >= 0 and syncopated_pos < pattern_size:
                new_pattern[syncopated_pos] = 1
        # For 'O', leave empty (no beat on metric or syncopated position)
    
    # Now get the new family positions
    N_pos = np.where(transformed_fam == 'N')[0]
    S_pos = np.where(transformed_fam == 'S')[0]
    O_pos = np.where(transformed_fam == 'O')[0]
    
    onsets = np.where(new_pattern == 1)[0]
    
    # Apply pattern generation logic with the NEW base pattern
    patterns = []
    
    # Process N positions
    N_pos_valid = list(int(metric_level*16)*N_pos)
    comb_of_beats = []
    for L in range(len(N_pos_valid) + 1):
        for subset in itertools.combinations(N_pos_valid, L):
            if np.size(np.asarray(subset)) == 0:
                continue
            comb_of_beats.append(np.asarray(subset))
    
    for i in comb_of_beats:
        pattern_tmp = np.copy(new_pattern)
        for j in i:
            try:
                if pattern_tmp[j+2] == 0:
                    continue
                pattern_tmp[j+1] = 1
            except:
                continue
        patterns.append(pattern_tmp)
    
    # Process O positions
    O_pos_valid = list(int(metric_level*16)*O_pos)
    comb_of_beats = []
    for L in range(len(O_pos_valid) + 1):
        for subset in itertools.combinations(O_pos_valid, L):
            if np.size(np.asarray(subset)) == 0:
                continue
            comb_of_beats.append(np.asarray(subset))
    
    for i in comb_of_beats:
        pattern_tmp = np.copy(new_pattern)
        for j in i:
            try:
                if pattern_tmp[j+2] == 1:
                    pattern_tmp[j+1] = 1
                else:
                    continue
            except:
                continue
        patterns.append(pattern_tmp)
    
    # Process S positions
    S_pos_valid = list(int(metric_level*16)*S_pos)
    comb_of_beats = []
    for L in range(len(S_pos_valid) + 1):
        for subset in itertools.combinations(S_pos_valid, L):
            if np.size(np.asarray(subset)) == 0:
                continue
            comb_of_beats.append(np.asarray(subset))
    
    for i in comb_of_beats:
        pattern_tmp = np.copy(new_pattern)
        for j in i:
            try:
                if pattern_tmp[j+2] == 1:
                    if pattern_tmp[j+1] == 0:
                        pattern_tmp[j+1] = 1
                    elif pattern_tmp[j+1] == 1:
                        pattern_tmp[j+1] = 0
                else:
                    continue
            except:
                continue
        patterns.append(pattern_tmp)
    
    patterns = np.asarray(patterns)
    patterns = np.unique(patterns, axis=0)
    
    return N_pos, S_pos, O_pos, onsets, comb_of_beats, patterns