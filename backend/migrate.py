import sqlite3

conn = sqlite3.connect('chronis.db')
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user'")
    cursor.execute("ALTER TABLE users ADD COLUMN profile_photo_url VARCHAR(255) DEFAULT NULL")
    conn.commit()
    print("Migration successful")
except Exception as e:
    print(f"Migration error: {e}")

conn.close()
