import json


class ResponseParser:

    def parse(self, text: str):

        try:

            return json.loads(text)

        except Exception:

            return {

                "overview": text,

                "goal": "",

                "prerequisites": [],

                "steps": [],

                "commands": [],

                "files": [],

                "notes": [

                    "Unable to parse model output."

                ],

                "checklist": []

            }