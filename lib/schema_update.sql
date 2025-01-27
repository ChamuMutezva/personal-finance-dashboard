-- Add reset_token column
ALTER TABLE users ADD COLUMN reset_token VARCHAR(255);

-- Add reset_token_expiry column
ALTER TABLE users ADD COLUMN reset_token_expiry TIMESTAMP;


