import random
import json

ratings = []

for i in range(11000,15000):
    rating = { "cocktail_id": i, "number_of_ratings" : 1, "sum_of_ratings" : random.randint(1, 5), "users" : ["a"]}
    ratings.append(rating)
    

with open('ratings.json', 'w') as json_file:
    json.dump(ratings, json_file)