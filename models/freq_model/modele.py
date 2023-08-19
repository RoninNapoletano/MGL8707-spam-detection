import os
import sys
import pandas as pd
import joblib
import json
# Charger le modèle XGBoost
model = joblib.load('model.joblib')  # Chargement de votre modèle

input_data_str = os.environ.get('INPUT_DATA')
input_data = json.loads(input_data_str)

    # Créer un DataFrame à partir des fonctionnalités générées
data = pd.DataFrame([input_data])
    # Faire la prédiction
prediction = model.predict(data)

print(prediction[0])
   