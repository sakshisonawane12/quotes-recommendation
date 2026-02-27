# quotes-recommendation

This is Quotes Recommendation Using NLP project

Prerequisites Setup
1️⃣ Installed Anaconda

Downloaded and installed Anaconda Distribution (Windows 64-bit)

Did NOT add Anaconda to system PATH

Only selected: ✔ Create Shortcuts

2️⃣ Created Python Virtual Environment

Created a dedicated environment for Rasa:

conda create -n rasa_env python=3.9
conda activate rasa_env
3️⃣ Installed Rasa NLU

Installed Rasa inside the virtual environment:

pip install rasa

Verified installation:

rasa --version
4️⃣ Initialized Rasa Project

Inside the project folder:

rasa init

This generated:

data/

domain.yml

config.yml

actions.py

credentials.yml

endpoints.yml

5️⃣ Development Environment

Using Visual Studio Code

Selected Python interpreter: rasa_env

Story 1: Install Rasa and Required Dependencies
1️⃣ Activated Virtual Environment
conda activate rasa_env
2️⃣ Installed Rasa Framework

Installed Rasa using pip:

pip install rasa==3.6.21

This installed:

Rasa NLU (Intent classification & entity extraction)

Rasa Core (Dialogue management)

Supporting NLP libraries (TensorFlow, sklearn, etc.)

3️⃣ Verified Installation
rasa --version

Successfully confirmed installation.
