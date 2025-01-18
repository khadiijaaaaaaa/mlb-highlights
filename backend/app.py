from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the updated CSV data with the 'team' column
data = pd.read_csv('../datasets/mlb_homeruns_teams_added_2024.csv')

@app.route('/highlights', methods=['GET'])
def get_highlights():
    player_name = request.args.get('player')  # Get player name from query parameter
    team_name = request.args.get('team')  # Get team name from query parameter

    if player_name:
        # Filter highlights by player name
        highlights = data[data['title'].str.contains(player_name)].to_dict(orient='records')
    elif team_name:
        # Filter highlights by team name
        highlights = data[data['team'].str.contains(team_name, case=False)].to_dict(orient='records')
    else:
        # If no player or team is specified, return all highlights
        highlights = data.to_dict(orient='records')

    return jsonify(highlights)

if __name__ == '__main__':
    app.run(debug=True)