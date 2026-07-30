import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse


class WebFetcher:

    def __init__(self):
        self.headers = {
            "User-Agent": (
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/138.0 Safari/537.36"
            )
        }

    def fetch(self, url: str) -> str:
        """
        Fetch and clean text content from a webpage.

        Args:
            url: Documentation URL.

        Returns:
            Cleaned text extracted from the webpage.
        """

        parsed_url = urlparse(url)
        if parsed_url.scheme not in {"http", "https"} or not parsed_url.netloc:
            raise ValueError("URL must be a valid http or https address.")

        response = requests.get(
            url,
            headers=self.headers,
            timeout=20
        )

        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        # Remove unnecessary elements
        for tag in soup([
            "script",
            "style",
            "noscript",
            "svg",
            "footer",
            "header"
        ]):
            tag.decompose()

        text = soup.get_text(separator="\n")

        cleaned = "\n".join(
            line.strip()
            for line in text.splitlines()
            if line.strip()
        )

        # Prevent sending extremely long prompts
        return cleaned[:15000]
