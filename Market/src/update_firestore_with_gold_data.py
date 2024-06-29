import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# Load the Excel file into a DataFrame
file_path = 'public\gold_products_dataset.xlsx'
df = pd.read_excel(file_path)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("theta-voyager-427310-j0-firebase-adminsdk-mcscv-32de311d66.json")  # Replace with the path to your downloaded JSON file
firebase_admin.initialize_app(cred)

# Get a Firestore client
db = firestore.client()

# Function to upload data to Firestore
def upload_to_firestore(df):
    for index, row in df.iterrows():
        doc_id = str(index + 1)  # Use the row index as the document ID
        doc_ref = db.collection('goldProducts').document(doc_id)
        doc_ref.set(row.to_dict())
        print(f"Uploaded document ID: {doc_id}")

# Upload the data to Firestore
upload_to_firestore(df)

print("Data upload complete.")
