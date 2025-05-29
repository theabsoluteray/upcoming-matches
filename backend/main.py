from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

API_KEY = os.getenv("API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/matches", methods=["GET"])
def get_matches():
    url = "https://v3.football.api-sports.io/fixtures?date=2025-05-29"

    headers = {
        "x-apisports-key": API_KEY
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data"}), 500

    data = response.json()
    fixtures = []

    for match in data.get("response", []):
        fixtures.append({
            "id": match["fixture"]["id"],
            "date": match["fixture"]["date"],
            "league": match["league"]["name"],
            "home_team": {
                "name": match["teams"]["home"]["name"],
                "logo": match["teams"]["home"]["logo"]
            },
            "away_team": {
                "name": match["teams"]["away"]["name"],
                "logo": match["teams"]["away"]["logo"]
            }
        })

    print(json.dumps(fixtures, indent=2))  # ✅ Fixed line
    return jsonify(fixtures)

if __name__ == "__main__":
    app.run(debug=True)
