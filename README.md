# Game of Thrones Character Creator & Card Game

## Demo for tech assessment / interview

This project was created to help deeply familiarize myself, and review previous attained knowledge of the various technologies included in this stack.

### Tech Stack

- Angular w/TailwindCSS
- Python (w/Flask)
- AWS: DynamoDB & S3 (w/boto3)
- OpenAI DALL-E Generative AI
- Three.js

### Dashboard

![Dashboard](./readme/img1.png "Dashboard")

### Character Selection Screen

Choose a name, pick a house, a class, then roll some randomly generated stats.
![Dashboard](./readme/img2.png "Dashboard")

### Generative AI

The first time you click your character's name on the list component (middle), an Open AI/DALL-E image is generated from the prompt we provide, which includes the character's details:

promptString = "This is a photo of a Game of Thrones character named " + data['name'] + ". They are a " + data['characterClass'] + " from the house " + data['house'] + ". They have " + data['strength'] + " strength, " + data['intelligence'] + " intelligence, and " + data['charisma'] + " charisma. Please generate a cool looking photo of them. overlay the character's name, house and stats. use house sigil as background."

```
    response = client.images.generate(
        model="dall-e-3",
        prompt=promptString,
        size="1024x1024",
        quality="standard",
        n=1,
    )

```

_Before you make any AWS calls you will need to supply your authentication credentials. the easiest way is to install the Amazon CLI and do 'aws configure'. This setup should enable "automatic" AWS authentication within your app. You can always do the old skool way and feed your boto3.resource the credentials within the code. Ultimately I'll be wanting to deploy this project, so I will have to enable this method anyway, so chances are by the time you read this it's already integrated and I forgot to update the README._

After generation, the image is uploaded to an AWS S3 bucket, and the image URL link is written to the character's database row.

![Dashboard](./readme/img3.png "Dashboard")

### Battlefield

After a character is selected, you can now enter the battlefield. A random opponent is selected from our generated characters, in similar fashion to classic arcade games such as Street Fighter. All potential opponents are displayed in grayscale, and the app quickly cycles through each pontential oppenent by briefly increasing their size and color. The cycle ultimately slows down and lands on the chosen opponent.

![Dashboard](./readme/img4.png "Dashboard")

### The Battle

Finally, you and your opponent engage in mortal combat:
![Dashboard](./readme/img5.png "Dashboard")

## Install Instructions

create a .env file in the root of your project and enter your OpenAI key.

_Note: To generate images with DALL-E, you need to sign up and pay about four cents per image._

```
OPEN_AI=ENTER_YOUR_KEY_HERE
```

from your terminal:

```
git clone https://github.com/infiniteoo/wbdemo.git
cd wbdemo
pip install && python -m venv venv && source venv/Scripts/activation
cd client
npm install
ng serve
```

_Your source command may end up pointing to a similar, but different filepath in the venv folder. Just look for activation._
