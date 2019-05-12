# Formonk
A simple Form Builder build using React and Flask.

## How to set up:
1. Clone this repository
2. Create a virtual environment with python(3.6.2) and pip and activate it
3. Run `cd formonk && pip install -r requirements.txt`
4. Run `cp dbconfig.example.py dbconfig.py`
5. Fill in the details of dbconfig.py
6. Run `cd templates/static && npm install`
7. Next `npm run build`
8. Run `cd ../.. && python run.py`
9. Goto [localhost:5000/]("http://localhost:5000/")

## Simpler Way
1. Clone this repository
2. Create a virtual environment with python(3.6.2) and pip and activate it.
3. Run `cd formonk && cp dbconfig.example.py dbconfig.py` and fill the details
4. Run `chmod +x runformonk.sh`
5. Run `./runformonk.sh`
9. Goto [localhost:5000/]("http://localhost:5000/")

From now on you can start server by running `python run.py`

