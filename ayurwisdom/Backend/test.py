import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file

print(os.getenv("GEMINI_API_KEY"))  # Should print your key
