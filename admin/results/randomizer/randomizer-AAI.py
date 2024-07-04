import sys
import random
import json
from math import ceil
# Retrieve the list of elements as a string from command-line arguments

elements_string = sys.argv[1]
elements_string = elements_string.replace("[", "").replace("]", "")

my_list = elements_string.split(',')
percent = int(sys.argv[2]) / 100
num_elements_to_pick = ceil(len(my_list) * percent)
random_elements = random.sample(my_list, num_elements_to_pick)
random_data = json.dumps(random_elements)
print(random_data)
