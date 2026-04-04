from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7
    
    imagekit_public_key: str
    imagekit_private_key: str
    imagekit_url_endpoint: str
    
    SQLALCHEMY_TEST_DATABASE_URL: str
    
    GMAIL_USER: str
    GMAIL_APP_PASSWORD: str
    SMTP_HOST: str
    SMTP_PORT: int
    
    model_config =SettingsConfigDict(env_file = ".env")

settings = Settings()