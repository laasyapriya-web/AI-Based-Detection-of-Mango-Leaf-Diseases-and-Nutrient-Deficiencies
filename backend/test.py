import requests
import json
import cv2
import numpy as np

# Test the API
def test_api():
    base_url = "http://localhost:5000"
    
    print("1. Testing health endpoint...")
    response = requests.get(f"{base_url}/health")
    print(f"Health: {response.json()}\n")
    
    print("2. Testing classes endpoint...")
    response = requests.get(f"{base_url}/classes")
    print(f"Classes: {response.json()}\n")
    
    print("3. Testing model info...")
    response = requests.get(f"{base_url}/model-info")
    print(f"Model Info: {response.json()}\n")
    
    print("4. Testing prediction with a sample image...")
    # Create a dummy image for testing
    dummy_image = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
    
    # Save temporarily
    cv2.imwrite("test_image.jpg", dummy_image)
    
    # Send prediction request
    with open("test_image.jpg", "rb") as f:
        files = {"file": ("test_image.jpg", f, "image/jpeg")}
        response = requests.post(f"{base_url}/predict", files=files)
    
    print(f"Prediction: {json.dumps(response.json(), indent=2)}\n")
    
    # Clean up
    import os
    if os.path.exists("test_image.jpg"):
        os.remove("test_image.jpg")

if __name__ == "__main__":
    test_api()