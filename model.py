from mongoengine import Document, StringField

class Item(Document):
    name = StringField(required=True, max_length=100)
    description = StringField(max_length=255)
    image = StringField(max_length=255)
    

    def to_json(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'image': self.image
            # Add other fields as needed
        }
