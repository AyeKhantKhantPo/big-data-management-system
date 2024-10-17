#!/bin/bash

# Run black for code formatting
echo "Running black..."
black .

# Run isort for import sorting
echo "Running isort..."
isort .

# Run flake8 for linting
echo "Running flake8..."
flake8 .

echo "Code formatting completed!"
