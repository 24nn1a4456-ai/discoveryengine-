import pandas as pd

file_path = "datasets/hm/customer.csv"

customer_data = pd.read_csv(file_path)

print("Customer dataset loaded successfully!")

print("\nDataset Shape:")
print(customer_data.shape)

print("\nColumn Names:")
print(customer_data.columns.tolist())

print("\nFirst 5 Rows:")
print(customer_data.head())