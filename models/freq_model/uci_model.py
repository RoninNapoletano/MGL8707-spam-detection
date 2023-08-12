import pandas as pd
import numpy as np
import time

from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split, cross_val_score, cross_validate
from sklearn.metrics import make_scorer, accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, auc, roc_curve, confusion_matrix

from imblearn.over_sampling import SMOTE

from xgboost import XGBClassifier
import joblib

# Set Pandas display options to show all columns and rows
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)

dataset = pd.read_csv("spambase_csv.xls")

#Create new correlated features
dataset['combined_415_857_log'] = np.log(dataset['word_freq_415'] + 1) * np.log(dataset['word_freq_857'] + 1)
dataset['combined_hp_hpl_log'] = np.log(dataset['word_freq_hp'] + 1) * np.log(dataset['word_freq_hpl'] + 1)
dataset['combined_direct_415_log'] = np.log(dataset['word_freq_direct'] + 1) * np.log(dataset['word_freq_415'] + 1)
dataset['combined_direct_857_log'] = np.log(dataset['word_freq_direct'] + 1) * np.log(dataset['word_freq_857'] + 1)

#Smote Technique
X = dataset.drop('class', axis=1)
y = dataset['class']
X_train, X_test, y_train, y_test = train_test_split(X, y,train_size=0.8, test_size=0.2, random_state=42)
smote = SMOTE(sampling_strategy='auto')



def print_metrics(y_true, y_pred):
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred)

    print("Accuracy: {:.2f}".format(accuracy))
    print("Precision: {:.2f}".format(precision))
    print("Recall: {:.2f}".format(recall))
    print("F1-score: {:.2f}".format(f1))
    
def print_cross_validat(cl, X_train, y_train):
    scoring = {
        'accuracy': make_scorer(accuracy_score),
        'precision': make_scorer(precision_score),
        'recall': make_scorer(recall_score),
        'f1': make_scorer(f1_score)
    }
    cv_results = cross_validate(dt_clf, X_train, y_train, cv=5, scoring=scoring)
    print("Cross-Validation Results:")
    print("Accuracy:", cv_results['test_accuracy'].mean())
    print("Precision:", cv_results['test_precision'].mean())
    print("Recall:", cv_results['test_recall'].mean())
    print("F1-score:", cv_results['test_f1'].mean())
    
def evaluate_model(model, X_train, y_train, X_test, y_test, cv=5):
    # Entraîner le modèle et mesurer le temps d'entraînement
    start_time = time.time()
    model.fit(X_train, y_train)
    fitting_time = time.time() - start_time
    
    # Prédire les étiquettes pour les données de test et mesurer le temps de prédiction
    start_time = time.time()
    y_pred = model.predict(X_test)
    scoring_time = time.time() - start_time
    
    # Calculer les métriques de performance
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc_roc = roc_auc_score(y_test, y_pred)
    
    # Effectuer la cross-validation et obtenir les scores de performance
    cv_accuracy = cross_val_score(model, X_train, y_train, cv=cv, scoring='accuracy').mean()
    cv_precision = cross_val_score(model, X_train, y_train, cv=cv, scoring='precision').mean()
    cv_recall = cross_val_score(model, X_train, y_train, cv=cv, scoring='recall').mean()
    cv_f1 = cross_val_score(model, X_train, y_train, cv=cv, scoring='f1').mean()
    cv_auc_roc = cross_val_score(model, X_train, y_train, cv=cv, scoring='roc_auc').mean()
    
     # Calculer la courbe ROC
    y_pred_prob = model.predict_proba(X_test)[:, 1]
    fpr, tpr, thresholds = roc_curve(y_test, y_pred_prob)
    roc_auc = auc(fpr, tpr)
    
    
    results_df = pd.DataFrame({
        'Model': [type(model).__name__],
        'Fitting time': [fitting_time],
        'Scoring time': [scoring_time],
        'Accuracy': [accuracy],
        'Precision': [precision],
        'Recall': [recall],
        'F1-score': [f1],
        'AUC_ROC': [auc_roc],
        'CV Accuracy': [cv_accuracy],
        'CV Precision': [cv_precision],
        'CV Recall': [cv_recall],
        'CV F1-score': [cv_f1],
        'CV AUC_ROC': [cv_auc_roc]
    }, columns=['Model', 'Fitting time', 'Scoring time', 'Accuracy', 'Precision', 'Recall', 'F1-score', 'AUC_ROC', 'CV Accuracy', 'CV Precision', 'CV Recall', 'CV F1-score', 'CV AUC_ROC'])
    
    print(results_df)
    return results_df

# SMOTE uniquement sur l'ensemble d'entraînement
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)
xgb_clf = XGBClassifier(random_state=42)
results_df_xgb = evaluate_model(xgb_clf, X_train_resampled, y_train_resampled, X_test, y_test)


#Extract model 
joblib.dump(xgb_clf, 'uci_xgb_model.joblib')