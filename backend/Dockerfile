# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

# Install required system packages
RUN apt-get update && apt-get install -y \
    mariadb-client \
    libmariadb-dev-compat \
    libmariadb-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5001 (macOS compatibility)
EXPOSE 5001

# RUN EXEC
CMD ["python", "main.py"]