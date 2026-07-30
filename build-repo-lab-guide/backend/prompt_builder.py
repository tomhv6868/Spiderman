from pathlib import Path


class PromptBuilder:

    def __init__(self):

        self.skill_path = Path(
            "skills/web-summarizer/skill.md"
        )

    def load_skill(self) -> str:

        with open(
            self.skill_path,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()

    def build(
        self,
        documentation: str
    ) -> tuple[str, str]:

        system_prompt = self.load_skill()

        user_prompt = f"""
Documentation:

{documentation}

Return ONLY valid JSON using this schema:

{{
    "overview": "...",
    "goal": "...",
    "prerequisites": [],
    "steps": [],
    "commands": [],
    "files": [],
    "notes": [],
    "checklist": []
}}

Do not return markdown.
Do not explain anything.
Return JSON only.
"""

        return system_prompt, user_prompt