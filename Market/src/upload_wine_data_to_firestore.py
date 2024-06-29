import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# Path to the processed Excel file
file_path = 'public\processed_combined_wine_data_first_100 (1).xlsx'

# Load the processed Excel file into a DataFrame
df = pd.read_excel(file_path)

# Print the column names to verify
print("Column names:", df.columns)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("theta-voyager-427310-j0-firebase-adminsdk-mcscv-32de311d66.json")  # Replace with the path to your downloaded JSON file
firebase_admin.initialize_app(cred)

# Get a Firestore client
db = firestore.client()

# Function to upload data to Firestore
def upload_to_firestore(df):
    for index, row in df.iterrows():
        # Use index as the document ID if 'id' column does not exist
        doc_id = str(row['id']) if 'id' in df.columns else str(index)
        doc_ref = db.collection('wineProducts').document(doc_id)
        doc_ref.set(row.to_dict())
        print(f"Uploaded document ID: {doc_id}")

# Upload the data to Firestore
upload_to_firestore(df)

print("Data upload complete.")
