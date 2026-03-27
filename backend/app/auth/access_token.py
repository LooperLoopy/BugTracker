import jwt
"""
create and verify jwt
"""
SECRET = "looooongsecretttjdsahposaiodsaoudsaoi2918321873721398hjhjshjshdjsa"

def create_access_token(olddata: dict):
    """
    Input: a string-string dictionary with user id or anything else we wanna put in jwt
    payload
    Return: jwt token string
    """
    data = olddata.copy()
    data["exp"] = 6942067
    return jwt.encode(data, SECRET, "HS256")

"""
if __name__ == "__main__":
    access_token = create_access_token({"sub": "123"})
    print("your access token is: " + access_token)
"""