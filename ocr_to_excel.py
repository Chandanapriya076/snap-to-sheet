from PIL import Image
import pytesseract
import pandas as pd

# Step 1: Tell Python where Tesseract is installed
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Step 2: Load your image
image = Image.open("table.png.jpeg")  # <-- replace with your image file name

# Step 3: Extract text from image
text = pytesseract.image_to_string(image)

# Step 4: Split text into lines and remove empty lines
lines = [line.strip() for line in text.split("\n") if line.strip() != ""]

# Step 5: Split each line into columns (assuming space-separated)
data = [line.split() for line in lines]

# Step 6: Save to Excel and CSV
df = pd.DataFrame(data)
df.to_excel("output.xlsx", index=False, header=False)
df.to_csv("output.csv", index=False, header=False)

print("✅ Excel and CSV files created successfully!")
