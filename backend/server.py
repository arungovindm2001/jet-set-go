from dotenv import load_dotenv
import os

from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
from math import sqrt

from supabase import create_client

load_dotenv()

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
app = Flask(__name__)
CORS(app)

user_ratings = {
    "arun": {
    "The Leela Ashtamudi, A Raviz Hotel": 7,
    "All Season’s D’Fort Ayurvedic Resort": 9,
    "OYO Flagship Souparnika Residency": 7,
    "OYO Flagship 88319 Ar Towers": 8,
    "Prasanthi Hotel": 6,
    "SPOT ON J P Tourist Home": 2,
    "Kalloos Island Backwater Resort": 6,
    "QUILON LAKE INN": 6,
    "Houseboat - Dream house houseboat Kollam": 8,
    "QUILON BEACH Inn": 7,
    "PRATHIBA RESIDENCY": 2,
    "Munroe Inn Homestay": 9,
    "HOTEL PANACEA VENTURES": 7,
    "NANI HOTELS & RESORTS": 4
    },
    "noel": {
    "The Leela Ashtamudi, A Raviz Hotel": 9,
    "All Season’s D’Fort Ayurvedic Resort": 5,
    "The Quilon Beach Hotel and Convention Center": 7,
    "Ashtamudi Villas": 8,
    "OYO Flagship Souparnika Residency": 5,
    "SPOT ON J P Tourist Home": 7,
    "Sree Janardhana Residency": 8,
    "Hotel All Season": 4,
    "Eva Meadows": 7,
    "OPERA": 6,
    "QUILON LAKE INN": 9,
    "Houseboat - Dream house houseboat Kollam": 3,
    "Munroe Inn Homestay": 8,
    "HOTEL PANACEA VENTURES": 4,
    "NANI HOTELS & RESORTS": 6
    },
    "harichand": {
    "The Leela Ashtamudi, A Raviz Hotel": 6,
    "All Season’s D’Fort Ayurvedic Resort": 8,
    "JEENA MOTEL": 9,
    "OYO Flagship Souparnika Residency": 4,
    "OYO Flagship 88319 Ar Towers": 6,
    "Prasanthi Hotel": 8,
    "SPOT ON J P Tourist Home": 5,
    "Beach villas pozhikkara": 2,
    "Sree Janardhana Residency": 7,
    "Eva Meadows": 6,
    "Kalloos Island Backwater Resort": 8,
    "Capital O Hotel Dona Castle": 4,
    "Samiira on Ashtamudi Lake": 5,
    "OPERA": 7,
    "QUILON LAKE INN": 6,
    "Houseboat - Dream house houseboat Kollam": 9,
    "QUILON BEACH Inn": 8,
    "PRATHIBA RESIDENCY": 5,
    "HOTEL PANACEA VENTURES": 3,
    "NANI HOTELS & RESORTS": 7
    },
    "anirudh": {
    "All Season’s D’Fort Ayurvedic Resort": 4,
    "JEENA MOTEL": 7,
    "OYO Flagship Souparnika Residency": 9,
    "OYO Flagship 88319 Ar Towers": 5,
    "Prasanthi Hotel": 2
    }
}

df = pd.DataFrame(user_ratings)

def unique_items():
    unique_items_list = []
    for person in user_ratings.keys():
        for items in user_ratings[person]:
            unique_items_list.append(items)
    s=set(unique_items_list)
    unique_items_list=list(s)
    return unique_items_list

def person_corelation(person1,person2):
    both_rated = {}
    for item in user_ratings[person1]:
        if item in user_ratings[person2]:
            both_rated[item] = 1

    number_of_ratings = len(both_rated)
    if number_of_ratings == 0:
        return 0

    person1_preferences_sum = sum([user_ratings[person1][item] for item in both_rated])
    person2_preferences_sum = sum([user_ratings[person2][item] for item in both_rated])

    person1_square_preferences_sum = sum([pow(user_ratings[person1][item], 2) for item in both_rated])
    person2_square_preferences_sum = sum([pow(user_ratings[person2][item], 2) for item in both_rated])

    product_sum_of_both_users = sum([user_ratings[person1][item] * user_ratings[person2][item] for item in both_rated])

    numerator_value = product_sum_of_both_users - (
    person1_preferences_sum * person2_preferences_sum / number_of_ratings)
    denominator_value = sqrt((person1_square_preferences_sum - pow(person1_preferences_sum, 2) / number_of_ratings) * (
    person2_square_preferences_sum - pow(person2_preferences_sum, 2) / number_of_ratings))
    if denominator_value == 0:
        return 0
    else:
        r = numerator_value / denominator_value
        return r

def most_similar_users(target_person,no_of_users):
    scores = [(person_corelation(target_person,other_person),other_person) for other_person in user_ratings if other_person !=target_person]
    scores.sort(reverse=True)
    return scores[0:no_of_users]

def target_hotels_to_users(target_person):
    target_person_hotel_lst = []
    unique_list =unique_items()
    for hotel in user_ratings[target_person]:
        target_person_hotel_lst.append(hotel)

    s=set(unique_list)
    recommended_hotels=list(s.difference(target_person_hotel_lst))
    a = len(recommended_hotels)
    if a == 0:
        return 0
    return recommended_hotels,target_person_hotel_lst

def recommendation_phase(person):
    totals = {}
    simSums = {}
    for other in user_ratings:
        if other == person:
            continue
        sim = person_corelation(person, other)

        if sim <= 0:
            continue
        for item in user_ratings[other]:
            if item not in user_ratings[person]:
                totals.setdefault(item, 0)
                totals[item] += user_ratings[other][item] * sim
                simSums.setdefault(item, 0)
                simSums[item] += sim

    rankings = [(total / simSums[item], item) for item, total in totals.items()]
    rankings.sort(reverse=True)
    recommendations_list = [(recommend_item,score) for score, recommend_item in rankings]
    return recommendations_list

@app.route("/ratings", methods=["GET"])
def get_ratings():
    return jsonify(user_ratings), 200

@app.route("/hotels", methods=["POST"])
def get_hotels():
    response = supabase.table("hotels").select("*").order("rating", desc=True).execute()
    return jsonify(response.data)

@app.route("/recommend", methods=["POST"])
def get_recommendations():
    data = request.get_json()
    user_id = data.get("user_id")
    recommendations={}
    if user_id in user_ratings.keys():
        a=recommendation_phase(user_id)
        if a != -1:
            print("Recommendation Using User based Collaborative Filtering: ")
            for hotel,weights in a:
                try:
                    response = supabase.table("hotels").select("description","image_url").eq("name", hotel).execute()
                    hotel_data = response.data[0]
                    recommendations[hotel] = {"description": hotel_data["description"], "image_url": hotel_data["image_url"], "rating": weights}
                except:
                    continue
            print(recommendations)
    else:
        return "Person not found in the dataset..please try again"

    return jsonify({"user_id": user_id, "recommendations": recommendations}), 200

if __name__ == "__main__":
    app.run(debug=True)