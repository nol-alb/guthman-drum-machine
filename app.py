from flask import Flask, jsonify, request
from flask import Flask, render_template, flash, redirect, url_for, session, request, logging, abort
from flask_cors import CORS
import patternGens as pGen
import random

app = Flask(__name__,static_folder='static',
            template_folder='templates')
CORS(app)

@app.route('/jam', methods=['GET'])
def present_machine():
    return render_template('index.html')

@app.route('/manipulate_array', methods=['POST'])
def manipulate_array():
    data = request.json
    array_id = data.get('id')
    input_array = data.get('array', [])
    
    # Example manipulation: invert numbers in the array
    modified_array = patternGens(input_array)
    
    return jsonify({"id": array_id, "modifiedArray": modified_array})

def patternGens(array=[]):
    N_pos,S_pos,O_pos,onsets,comb_of_beats,patterns = pGen.new_patterns(1/16, array)
    randIndex = random.randint(0,len(patterns)-1)


    return patterns[randIndex].tolist()

if __name__ == '__main__':
    app.run(debug=True)