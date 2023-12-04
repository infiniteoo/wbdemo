from mongoengine import Document, StringField

class Item(Document):
    # Fields definition
    name = StringField(required=True, max_length=100)
    description = StringField(max_length=255)
    image = StringField(max_length=255)

    # Meta information for the collection (e.g., collection name in MongoDB)
    meta = {
        'collection': 'items',
        'indexes': [
            # Add indexes if needed for better query performance
            {'fields': ['name'], 'unique': True},
        ],
    }

    # Method to convert the document to a JSON-like structure
    def to_json(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'image': self.image
            # Add other fields as needed
        }

    # Custom validation logic if required
    def clean(self):
        # Example: Ensure that the name is unique (case-insensitive)
        existing_item = Item.objects(name__iexact=self.name).first()
        if existing_item and existing_item.id != self.id:
            raise ValidationError(f"Item with name '{self.name}' already exists.")
