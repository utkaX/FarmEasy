import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier

# Load dataset
crop = pd.read_csv("Crop_recommendation.csv")

# Crop dictionary (corrected for reverse lookup)
crop_dict = {
    'rice': 1, 'maize': 2, 'jute': 3, 'cotton': 4, 'coconut': 5, 'papaya': 6, 
    'orange': 7, 'apple': 8, 'muskmelon': 9, 'watermelon': 10, 'grapes': 11, 
    'mango': 12, 'banana': 13, 'pomegranate': 14, 'lentil': 15, 'blackgram': 16, 
    'mungbean': 17, 'mothbeans': 18, 'pigeonpeas': 19, 'kidneybeans': 20, 
    'chickpea': 21, 'coffee': 22
}

# Reverse dictionary for predictions
num_to_crop = {v: k for k, v in crop_dict.items()}

# Map crop names to numbers
crop['crop_num'] = crop['label'].map(crop_dict)
crop.drop(['label'], axis=1, inplace=True)

# Split dataset
X = crop.drop(['crop_num'], axis=1)
y = crop['crop_num']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the data
scaler = MinMaxScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train the model
rfc = RandomForestClassifier()
rfc.fit(X_train, y_train)

# Save model and scaler
joblib.dump(rfc, "random_forest_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("Model and Scaler Saved Successfully")

# Function for recommendation
def recommend(N, P, K, temp, humidity, ph, rainfall):
    try:
        features = np.array([[N, P, K, temp, humidity, ph, rainfall]])
        transformed = scaler.transform(features)
        prediction = rfc.predict(transformed)
        predicted_crop = num_to_crop.get(prediction[0], "Unknown Crop")

        # Debugging
        print(f"Input Features: {features}")
        print(f"Transformed Features: {transformed}")
        print(f"Model Prediction: {prediction[0]}")
        print(f"Predicted Crop: {predicted_crop}")

        return predicted_crop

    except Exception as e:
        print("Error in recommendation:", str(e))
        return "Unknown Crop"
