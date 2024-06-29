import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# Path to the sweets dataset Excel file
file_path = 'public\sweets_dataset.xlsx'

# Load the sweets dataset into a DataFrame
df = pd.read_excel(file_path)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("theta-voyager-427310-j0-firebase-adminsdk-mcscv-32de311d66.json")  # Replace with the path to your downloaded JSON file
firebase_admin.initialize_app(cred)

# Get a Firestore client
db = firestore.client()

# Function to upload data to Firestore
def upload_to_firestore(df, collection_name):
    for index, row in df.iterrows():
        doc_id = str(index)  # Using the row index as the document ID
        doc_ref = db.collection(collection_name).document(doc_id)
        doc_ref.set(row.to_dict())
        print(f"Uploaded document ID: {doc_id}")

# Upload the sweets dataset to Firestore under the collection "sweets"
upload_to_firestore(df, "sweets")

print("Sweets data upload complete.")
