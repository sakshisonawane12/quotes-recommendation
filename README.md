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

Story 2: Setting Up the Rasa Project
📌 Project Initialization

After successfully installing Rasa, the project structure was initialized using the built-in Rasa command:

rasa init

This command automatically generated the default chatbot template along with all required directories and configuration files.

📂 Project Structure Created

After initialization, the following structure was generated:

quotes-recommendation/
│
├── data/
│ ├── nlu.yml
│ ├── stories.yml
│ ├── rules.yml
│
├── actions/
├── models/
├── tests/
│
├── config.yml
├── domain.yml
├── credentials.yml
├── endpoints.yml
📖 Description of Key Components
📁 data/

Contains training data files:

nlu.yml – Defines user intents and example phrases.

stories.yml – Defines conversation flow.

rules.yml – Defines rule-based interactions.

📁 actions/

Used for defining custom backend logic and integrations.
This will later support dynamic quote recommendation and API interaction.

📁 models/

Stores trained chatbot models generated after running:

rasa train
📁 tests/

Used for storing test stories to validate chatbot behavior.

⚙ config.yml

Defines:

NLU pipeline (how user input is processed)

Dialogue policies (how responses are selected)

🧠 domain.yml

Defines:

Intents

Responses

Actions

Session configuration

🔌 credentials.yml

Configures communication channels such as REST API for web integration.

🌐 endpoints.yml

Defines service endpoints, including action server configuration.

Epic 3 – Story 1: Data Collection – Creating User Queries (nlu.yml)
📌 Objective

The goal of this step was to define possible user queries and map them to appropriate intents. Since the chatbot provides quote recommendations, users may request different types of quotes such as motivational, inspirational, romantic, humorous, or success-related quotes.

🧠 Defining Intents

The following intents were created:

greet

motivation

inspiration

love

funny

success

goodbye

Each intent represents the purpose behind a user’s message.

📝 Training Data Format

User queries were defined in data/nlu.yml using YAML format:

- intent: motivation
  examples: |
  - I need motivation
  - motivate me
  - give me a motivational quote

Multiple example sentences were added for each intent to improve model understanding and classification accuracy.

Epic 3 – Story 2: Defining Chatbot Responses (domain.yml)
📌 Objective

After defining user intents in nlu.yml, the next step was to configure chatbot responses in domain.yml. This file acts as the central configuration for mapping user intents to appropriate responses.

🧠 Intents Configured

The following intents were defined in the domain file:

greet

motivation

inspiration

love

funny

success

goodbye

💬 Response Mapping

Each intent was mapped to a corresponding response using utter\_ actions.

Example:

utter_motivation:

- text: "Push yourself, because no one else is going to do it for you."
- text: "Great things never come from comfort zones."

Multiple response variations were added for each category to:

Avoid repetitive replies

Improve user engagement

Provide fresh quote recommendations

🔄 Conversation Flow

The conversation flow was defined in stories.yml, linking each intent to its respective response action.

Example:

- story: motivation path
  steps:
  - intent: motivation
  - action: utter_motivation

  Epic 3 – Story 3: Defining Interaction Between User and Chatbot (stories.yml)
  📌 Objective

After defining intents (nlu.yml) and responses (domain.yml), the next step was to design the conversational flow of the chatbot using stories.yml.

Stories define how the chatbot should respond to specific user intents in a structured conversation pattern.

🧠 Conversation Flow Design

Each story represents a sample interaction between the user and the chatbot.

A story consists of:

A user intent

A corresponding bot action (response)

Example:

- story: motivation flow
  steps:
  - intent: motivation
  - action: utter_motivation

This ensures that whenever the user expresses a motivational intent, the chatbot responds with a motivational quote.

💬 Interaction Patterns Implemented

The following conversational flows were defined:

greet → utter_greet

motivation → utter_motivation

inspiration → utter_inspiration

love → utter_love

funny → utter_funny

success → utter_success

goodbye → utter_goodbye

These structured mappings ensure predictable and meaningful chatbot behavior.

🎯 Importance of Stories

Helps Rasa Core learn dialogue management

Prevents random or inconsistent replies

Maintains logical flow in conversation

Improves user experience

✅ Outcome

The chatbot now follows a structured interaction pattern, responding logically to user requests and maintaining conversational consistency.

Epic 3 – Story 4: Model Training
📌 Objective

After preparing the training data (nlu.yml), domain configuration (domain.yml), and conversation stories (stories.yml), the chatbot model was trained using Rasa’s built-in training command.

⚙ Training Command
rasa train

This command trained both:

Natural Language Understanding (NLU)

Dialogue Management (Rasa Core)

🧠 During Training, The Model Learned To:

Classify user intents

Manage conversational context

Map intents to appropriate responses

Maintain structured dialogue flow

📂 Model Output

After successful training, the trained model was saved inside the models/ directory in .tar.gz format.

✅ Outcome

The chatbot model was successfully trained and is now capable of understanding user queries and responding appropriately.
