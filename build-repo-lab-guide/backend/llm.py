import os

from dotenv import load_dotenv
from google import genai

load_dotenv()


class LLM:

    def __init__(self):

        self.client = genai.Client(
            api_key=os.getenv("GEMINI_API_KEY")
        )

        self.model = os.getenv(
            "MODEL",
            "gemini-flash-latest"
        )

    def generate(
        self,
        system_prompt: str,
        user_prompt: str
    ) -> str:

        response = self.client.models.generate_content(
            model=self.model,
            contents=user_prompt,
            config={
                "system_instruction": system_prompt,
                "temperature": 0.2
            }
        )

        return response.text
