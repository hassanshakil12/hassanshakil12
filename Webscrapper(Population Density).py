import pandas as pd
import requests
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/World_population"

data = requests.get(url).text
soup = BeautifulSoup(data, 'html.parser')
tables = soup.find_all('table')
# print(len(tables))

for index,table in enumerate(tables):
    if ("10 most densely populated countries" in str(table)):
        table_index = index
        
#print(table_index)

#print(tables[table_index].prettify())

population_data = pd.DataFrame(columns = ["Rank", "Country", "Population", "Area", "Density"])

for row in tables[table_index].tbody.find_all("tr"):
    col = row.find_all("td")
    if (col != []):
        rank = col[0].text
        country = col[1].text
        population = col[2].text
        area = col[3].text
        density = col[4].text
        population_data = population_data.append({"Rank":rank, "Country":country, "Population":population, "Area":area, "Density":density}, ignore_index=True)

#print(population_data)
pd.read_html(str(tables[5]), flavor = 'bs4')

population_data_read_html = pd.read_html(str(tables[5]), flavor = 'bs4')[0]
#print(population_data_read_html)

datafram_list = pd.read_html(url, flavor = 'bs4')
#print(datafram_list[5])

print(pd.read_html(url, match = '10 most densely populated countries', flavor = 'bs4')[0])
