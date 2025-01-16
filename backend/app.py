from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load the cleaned CSV data
data = pd.read_csv('../datasets/mlb_homeruns_2024.csv')

@app.route('/highlights', methods=['GET'])
def get_highlights():
    player_name = request.args.get('player')  # Get player name from query parameter
    if player_name:
        highlights = data[data['title'].str.contains(player_name)].to_dict(orient='records')
        return jsonify(highlights)
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)