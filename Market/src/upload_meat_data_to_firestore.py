import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# Path to the meat dataset Excel file
meat_file_path = 'public\meat_products_dataset.xlsx'

# Load the meat dataset into a DataFrame
meat_df = pd.read_excel(meat_file_path)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("theta-voyager-427310-j0-firebase-adminsdk-mcscv-32de311d66.json")  # Replace with the path to your downloaded JSON file
firebase_admin.initialize_app(cred)

# Get a Firestore client
db = firestore.client()

# Function to upload meat data to Firestore
def upload_meat_data_to_firestore(df):
    for index, row in df.iterrows():
        doc_id = str(index)
        doc_ref = db.collection('meatProducts').document(doc_id)
        doc_ref.set(row.to_dict())
        print(f"Uploaded document ID: {doc_id}")

# Upload the meat data to Firestore
upload_meat_data_to_firestore(meat_df)

print("Meat data upload complete.")
