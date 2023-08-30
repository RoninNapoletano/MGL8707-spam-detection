import os
import sys
import pandas as pd
import joblib
import json
from comet_ml import Experiment

# Charger le modèle XGBoost
model = joblib.load('model.joblib')  # Chargement de votre modèle
experiment = Experiment(
  api_key="",
  project_name="mgl8707",
  workspace="roninnapoletano"
)

input_data_str = os.environ.get('INPUT_DATA')
input_data = json.loads(input_data_str)

    # Créer un DataFrame à partir des fonctionnalités générées
data = pd.DataFrame([input_data])
    # Faire la prédiction
prediction = model.predict(data)
prediction_int = int(prediction[0])
experiment.log_metric("prediction", prediction_int)
experiment.end()
# Créer un dictionnaire contenant la prédiction
result_dict = {
    "prediction": prediction_int
}

# Convertir le dictionnaire en une chaîne JSON
result_json = json.dumps(result_dict)

# Imprimer la chaîne JSON pour la renvoyer en sortie
print(result_json)
   