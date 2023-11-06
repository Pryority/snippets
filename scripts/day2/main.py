#!/usr/bin/env python3

import os
from PIL import Image

def convert_bytes(file_size):
  for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
    if file_size < 1024.0:
      break
    file_size /= 1024.0
  return f"{file_size:.2f} {unit}"

# Function to convert JPEG and PNG images in a folder to WebP format (recursive)
def convert_images_to_webp(folder_path):
    # Iterate through each file and directory in the folder
    for root, _, files in os.walk(folder_path):
        for file in files:

            if not file.lower().endswith(('.webp')):
              f = os.path.join(root, file)
              file_size = os.path.getsize(f)
              print(f"Original: {file} -- {convert_bytes(file_size)}")

              if file.lower().endswith(('.jpeg', '.jpg', '.png')):
                  try:
                      # Open the image using Pillow
                      with Image.open(os.path.join(root, file)) as img:
                          # print(f"{file} size is {file_size}")
                          # Get the filename without extension
                          filename, _ = os.path.splitext(file)

                          # Convert the image to WebP format
                          img.save(os.path.join(root, f"{filename}.webp"), 'WEBP')

                          # new_webp_file =
                          print(f"Shrunken: {file} -- {convert_bytes(os.path.getsize(os.path.join(root, f'{filename}.webp')))}")

                  except Exception as e:
                      print(f"Error converting {file}: {e}")

# Example usage: specify the main folder path
folder_path = '/Users/matthewpryor/projects/snippets/scripts/day2/to_be_converted'
convert_images_to_webp(folder_path)

