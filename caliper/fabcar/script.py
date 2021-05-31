import random
# Creating a number list
Car_list=[]
p=[]
s=1
for x in range(1, 100):
    Car_list.append("Car"+str(x))
    p.append(1/(x**s))  
list1=(random.choices(Car_list, weights=p, k=len(p)))
print(list1)