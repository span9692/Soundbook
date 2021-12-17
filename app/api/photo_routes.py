from flask import Blueprint
from app.models import Photo

photo_routes = Blueprint('photos', __name__)

@photo_routes.route('/<int:id>')
def photos(id):
    photos = Photo.query.filter(Photo.owner_id == id)
    return {'photos': [photo.to_dict() for photo in photos]}
