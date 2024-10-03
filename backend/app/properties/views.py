from fastapi import Depends, APIRouter, UploadFile, HTTPException, File, Form
from app.auth.views import security
from fastapi.security import HTTPBasicCredentials
from core.database import get_db
from sqlalchemy.orm import Session
from app.auth.auth import decode_token
from app.users.models import User
from core import http_msg
from .models import Property, PropertyImage
from . import schemas
from minio import Minio
from minio.error import S3Error
import uuid


property_route = APIRouter(prefix='/api/v1/properties', tags=['properties'])

# configure minio
minio_client = Minio(
    "localhost:9000", 
    access_key="kejaprime",
    secret_key="kejaprime123",
    secure=False
)

# Ensure bucket exists
bucket_name = "property-images"
if not minio_client.bucket_exists(bucket_name):
    minio_client.make_bucket(bucket_name)


@property_route.post('/property')
def add_property(
    property_data: schemas.PropertyPostModel,
    credentials: HTTPBasicCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    """ Add property in the databse """
    
    # Decode the token to get user information
    token = credentials.credentials
    payload = decode_token(token)
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token or no email found.")

    # Verify that the user is a landlord
    user = User.get_user_by_email(email, db)
    if not user.is_landlord:
        raise http_msg.forbidden()

    # Create the new property in the database
    new_property = Property(
        landlord_id=user.id,
        name=property_data.name,
        location=property_data.location,
        description=property_data.description,
        bedrooms=property_data.bedrooms,
        price=property_data.price
    )
    db.add(new_property)
    db.commit()
    db.refresh(new_property)  # Refresh to get the property ID after commit
    return {
        "message": "Property created successfully",
        "id": new_property.id
    }
  


@property_route.post('/{property_id}/images')
async def upload_image(
    property_id: str,
    file: UploadFile,
    db: Session = Depends(get_db)
    ):
    """
    upload images to the properties with specific ids
    """
    # Generate a unique identifier for the image
    new_property = db.query(Property).filter_by(id=property_id).first()
    if not new_property:
        raise http_msg.not_found("Property")
    
    image_id = str(uuid.uuid4())
    property_image_path = f"{new_property.id}/{image_id}.jpg"  # Image path in MinIO

    try:
        # Upload the image file to MinIO
        file.file.seek(0, 2)  # Seek to the end to get the size
        file_size = file.file.tell()  # Get the size
        file.file.seek(0)  

        minio_client.put_object(
            bucket_name,
            property_image_path,
            file.file,
            length=file_size, 
            content_type=file.content_type
        )

        # Store the image URL in the database
        image_url = f"http://localhost:9000/{bucket_name}/{property_image_path}"
        new_image = PropertyImage(
            property_id=new_property.id,
            image_url=image_url
        )
        db.add(new_image)
        db.commit()

    except S3Error as err:
        raise HTTPException(status_code=500, detail=f"Error uploading image: {err}")

    return {"message": "succesfully added image", "url": image_url}


@property_route.get('/', response_model=list[schemas.PropertyResponseModel])
async def all_properties(db: Session = Depends(get_db)):
    """
    retrieve all properties in the database
    """
    properties = db.query(Property).all()
    return properties

@property_route.get('/{property_id}/images', response_model=list[schemas.PropertyImageResponseModel])
async def all_images(property_id: str, db: Session = Depends(get_db)):
    """
    obtain images of specific properties
    """
    images = db.query(PropertyImage).filter_by(property_id=property_id).all()
    if not images:
        raise http_msg.not_found("Images")
    return images


@property_route.put('/{property_id}', response_model=schemas.PropertyResponseModel)
async def update_property(
    property_id: str,
    property_data: schemas.PropertyPostModel,
    db: Session = Depends(get_db)
    ):
    """
    update property details
    """
    property = db.query(Property).filter_by(id=property_id).first()
    if not property:
        raise http_msg.not_found("Property")
    
    property.price = property_data.price
    property.location = property_data.location
    property.description = property_data.description
    property.name = property_data.name
    property.bedrooms = property_data.bedrooms

    db.commit()
    db.refresh(property)
    return property

    

@property_route.delete('/{property_id}/images/{image_id}')
def delete_image(
    property_id: str,
    image_id: str,
    db: Session = Depends(get_db)
):
    """
    delete specific images of properties
    """
    image = db.query(PropertyImage).filter_by(property_id=property_id, id=image_id).first()
    if not image:
        raise http_msg.not_found("Image")
    
    image_path = f"{property_id}/{image_id}.jpg"
    try:
      # delete the image from minio
      minio_client.remove_object(bucket_name, image_path)
    except S3Error as err:
        raise HTTPException(status_code=500, detail=f"Error deleting image from MinIO: {err}")
    
    db.delete(image)
    db.commit()
    return {"message": "Image deleted successfully"}
