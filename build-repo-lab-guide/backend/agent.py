from backend.fetcher import WebFetcher
from backend.prompt_builder import PromptBuilder
from backend.llm import LLM
from backend.parser import ResponseParser


class DocumentationAgent:

    def __init__(self):

        self.fetcher = WebFetcher()

        self.prompt_builder = PromptBuilder()

        self.llm = LLM()

        self.parser = ResponseParser()

    def summarize(self, url: str):

        # Step 1
        documentation = self.fetcher.fetch(url)

        # Step 2
        system_prompt, user_prompt = (
            self.prompt_builder.build(
                documentation
            )
        )

        # Step 3
        response = self.llm.generate(

            system_prompt=system_prompt,

            user_prompt=user_prompt

        )

        # Step 4
        result = self.parser.parse(response)

        return result


agent = DocumentationAgent()


def summarize_documentation(url: str):

    return agent.summarize(url)