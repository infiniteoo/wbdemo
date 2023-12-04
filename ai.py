from dotenv import load_dotenv
import os
load_dotenv()

from openai import OpenAI
openAIKey = os.getenv("OPEN_AI")
openOrg = os.getenv("ORG")
print("OPEN_AI", openAIKey)
print("OPEN_AI", openOrg)
client = OpenAI(api_key=openAIKey, organization=openOrg)

response = client.images.generate(
  model="dall-e-3",
  prompt="a white siamese cat",
  size="1024x1024",
  quality="standard",
  n=1,
  
)

image_url = response.data[0].url
print(image_url)





