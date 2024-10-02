from fastapi import HTTPException, status


def not_found(data: str = "resource"):
  return HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail=f'error {data} not found'
    )

def not_authorized():
  return HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='user not authorized'
    )

def forbidden():
  return HTTPException(
    status_code=status.HTTP_403_FORBIDDEN, detail='user is forbidden'
    )

def bad_request(detail: str = "Bad request"):
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=detail
    )


def internal_server_error(detail: str = "Internal server error"):
    return HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=detail
    )

def created(detail: str = "resource succesfully created"):
   return HTTPException(
      status_code=status.HTTP_201_CREATED,
      detail=f'{detail} succesfully created'
   )