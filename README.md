
## Documentation of each route:

### GET /alive

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 31 Mar 2019 11:16:28 GMT
Content-Length: 16
Connection: close

{
  "version": 0.1
}
```

### GET /live/departures

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 31 Mar 2019 11:16:45 GMT
Content-Length: 96
Connection: close

[
  {
    "Code": "EZY8902",
    "Operator": "EasyJet",
    "Time": "15:15",
    "Status": "Departed 15:08",
    "To": "London"
  }
]
```

### GET /live/arrivals