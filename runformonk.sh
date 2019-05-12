pip install -r requirements.txt
cd templates/static && npm install
npm run build
cd ../.. && python run.py