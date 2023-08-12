# Utilisez une image de base Python appropriée
FROM python:3.9

# Définissez le répertoire de travail dans l'image
WORKDIR /app

# Copiez le fichier requirements.txt dans l'image
COPY requirements.txt .

# Installez les dépendances à partir du fichier requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiez le modèle et votre script dans l'image
COPY uci_model.py .
COPY spambase_csv.xls .

# Commande par défaut pour exécuter votre script (remplacez cela par la commande appropriée pour lancer votre modèle)
CMD ["python", "uci_model.py"]