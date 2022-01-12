
# Project Shaker

# Koriscene tehnologije 

![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/Semantic_UI-563D7C?style=for-the-badge&logo=semanticui&logoColor=white)


# Opis :memo: :

Web aplikacija koja nudi veliki broj recepata za koktele. Moguce pretrazivati recepte po nazivu koktela ili po sastojcima i filtrirati rezultate prema nekoliko kategorija. Korisnik moze da se registruje, pretrazuje i ocenjuje koktele i pravi svoju listu omiljenih recepata.


# Instalacija :hammer: :

Node se moze preuzeti na [ovom](https://nodejs.org/en/download/) linku.
MongoDB se moze preuzeti na [ovom](https://www.mongodb.com/try/download/community) linku.

# Preuzimanje i pokretanje :wrench: :

1. U terminalu se pozicionirati u zeljeni direktorijum
2. Klonirati repozitorijum komandom: `$ git clone https://gitlab.com/matfpveb/projekti/2021-2022/05-Shaker
3. Povezati se na bazu pokretanjem sledece komande:
``` 
sudo systemctl start mongod
```
 4. Pozicionirati se u `server` folder i pokrenuti komandu:
``` 
npm install 
```
5. U direktorijumu data pokrenuti komandu:
``` 
./import.sh 
```
6. Iz direktorijuma `server` pokrenuti komandu:
``` 
node server.js
```
7. Pozicionirati se u `client` folder i pokrenuti komandu:
``` 
npm install
```
8. Pokrenuti komandu:
``` 
ng serve
```
9. U pretrazivacu otvoriti adresu http://localhost:4200/


___

Aplikacija se moze pokrenuti i koriscenjem skripta.

1. U terminalu se pozicionirati u zeljeni direktorijum
2. Klonirati repozitorijum komandom: `$ git clone https://gitlab.com/matfpveb/projekti/2021-2022/05-Shaker
3. Pozicionirati se u `server` folder i pokrenuti komandu:
``` 
./serverstart.sh
```
4. Pozicionirati se u `client` folder i pokrenuti komandu:
``` 
./clientstart.sh
```

Aplikacija je pokrenuta na adresi http://localhost:4200/. 

## Schema baze podataka 
<table>
<tr>
<th>Users</th>
<th>Ratings</th>
<th>Favourites</th>
</tr>
<tr>
<td>

 Polje             | Tip       | Opis                               |
 ----------------- | ----------|------------------------------------|
 username          | String    |                                    |
 hash              | String    | podaci za cuvanje lozinke          |
 salt              | String    | podaci za cuvanje lozinke          |
 age               | Number    |                                    |
</td>
<td>

 Polje             | Tip      | Opis                                 |
 ------------------| ---------|--------------------------------------|
 _id               | ObjectId |                                      |
 cocktail_id       | Number   |                                      |
 number_of_ratings | Number   |       broj datih ocena koktela       |
 sum_of_ratings    | Number   |    suma svih ocena koktela           |
 users             | [String] |lista korisnika koji su ocenili koktel|
</td>
<td>

 Polje      | Tip       | Opis                                                  |
 ---------  | ----------|-------------------------------------------------------|
 username   | String    |                                                       |
 cocktails  | [cocktail]| id i naziv svih koktela koje je korisnik dodao u listu|
</td>
</tr>
</table>



# Demo snimak aplikacije :movie_camera: :

## Developers

- [Lucija Milicic, 29/2018](https://gitlab.com/lucijamilicic)
- [Natalija Asanovic, 171/2018](https://gitlab.com/Natalija9)
- [Jovana Djurovic, 290/2018](https://gitlab.com/djurovicj)
- [Miodrag Todorovic, 100/2018](https://gitlab.com/m.todorovic)
