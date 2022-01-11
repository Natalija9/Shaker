python3 ratings.py
mongo ShakerDB --eval "db.dropDatabase()"
mongoimport --db ShakerDB --collection users --file users.json --jsonArray
mongoimport --db ShakerDB --collection ratings --file ratings.json --jsonArray
mongoimport --db ShakerDB --collection favourites --file favourites.json --jsonArray

