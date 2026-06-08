import os
import glob

backend_dir = r"d:\Chronis\chronis\backend"

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace routes/ imports
    if 'routes' in filepath:
        content = content.replace('from ..database', 'from database')
        content = content.replace('from ..models', 'from models')
        content = content.replace('from ..schemas', 'from schemas')
        content = content.replace('from ..auth', 'from auth')
    else:
        # Replace top-level imports
        content = content.replace('from .database', 'from database')
        content = content.replace('from .models', 'from models')
        content = content.replace('from .schemas', 'from schemas')
        content = content.replace('from .routes', 'from routes')
        content = content.replace('from .auth', 'from auth')

    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk(backend_dir):
    if 'venv' in root or '__pycache__' in root:
        continue
    for file in files:
        if file.endswith('.py'):
            replace_in_file(os.path.join(root, file))

print("Imports fixed.")
