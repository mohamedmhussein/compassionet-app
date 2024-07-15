from fastapi import APIRouter, Depends, status
from .. import models, oauth2, schemas
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(
    prefix='/comments',
    tags=['Comments'],
    )

@router.post('/add_comment', status_code = status.HTTP_201_CREATED)
async def add_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    
    new_comment = models.Comment(
        content=comment.content,
        user_id=current_user.id,
        post_id=comment.post_id
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return {'message': "comment is added successfully"}