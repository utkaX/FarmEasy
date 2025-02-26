from flask import Flask, request, jsonify
from model import recommend
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to Crop Recommendation API"

@app.route('/recommend', methods=['POST'])
def recommend_crop():
    try:
        data = request.json
        N = data['N']
        P = data['P']
        K = data['K']
        temperature = data['temperature']
        humidity = data['humidity']
        ph = data['ph']
        rainfall = data['rainfall']

        recommended_crop = recommend(N, P, K, temperature, humidity, ph, rainfall)
        return jsonify({"recommended_crop": recommended_crop})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
