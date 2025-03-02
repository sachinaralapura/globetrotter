## Routes
---
### GET

#### /random 
> 	returns a random clue with four options

```json
{ clues :[clue1 , clue1] , options :[op1,op2,op3,op4] , id : id }
```

```bash
curl http://<base_url>/api/random
```
---
### POST

#### /validate

>validate the question and answers
>returns if the answer is true of false

- Body
```json
{id : id , answer : "cityName"}
```
	
- returns		
```json
{isCorrect : boolen}
```

- test
```bash
curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "answer": ""}' <base_url/validate>
```

```bash
curl -X POST -H "Content-Type: application/json" -d '{"id": 0, "answer": "Tokyo"}' http://localhost:3000/api/validate
```
---


