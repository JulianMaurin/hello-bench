from flask import Flask, jsonify
from functools import cache
from dataclasses import dataclass, asdict

app = Flask(__name__)

@cache
def get_json_items():
    return [
        {"message": "Hello World"}
        for _ in range(100)
    ]


@app.route("/hello-world", methods=["GET"])
def hello_word():
    return jsonify(get_json_items())
