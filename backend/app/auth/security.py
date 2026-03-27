import bcrypt
"""
Password hashing and verification

"""
def get_hash_password(password: str)->str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
def verify_password(plain_password: str, hashed_password: str)->bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

"""
test these functions
if __name__ == "__main__":
    test_password = hash_password("password123")
    print("password hash is" + test_password)
    print("Sending password: password123... verified?:"+ str(verify_password("password123", test_password)))
    print("Sending password: wrongpassword... verified?:"+ str(verify_password("wrongpassword", test_password)))
    """