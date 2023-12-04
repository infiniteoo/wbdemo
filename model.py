from mongoengine import Document, StringField, IntField
from json import JSONEncoder

class Character(Document):
    name = StringField(required=True)
    house = StringField(required=True)
    characterClass = StringField(required=True)
    strength = IntField(required=True)
    intelligence = IntField(required=True)
    charisma = IntField(required=True)

    def to_json(self):
        return {
            'name': self.name,
            'house': self.house,
            'characterClass': self.characterClass,
            'strength': self.strength,
            'intelligence': self.intelligence,
            'charisma': self.charisma
        }
