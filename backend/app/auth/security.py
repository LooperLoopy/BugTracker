from passlib.context import CryptContext
"""
Password hashing and verification
"""
myctx = CryptContext(schemes="bcrypt")
def hash_password(password):
    return myctx.hash(password)
def verify_password(plain_password, hashed_password):
    return myctx.verify(plain_password, hashed_password)