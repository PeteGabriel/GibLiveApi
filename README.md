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

### GET /departures

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 31 Mar 2019 11:16:45 GMT
Content-Length: 96
Connection: close

[
  {
    "date": "Thursday 1st of August 2019",
    "events": [
      {
        "code": "EZY6299",
        "operator": "EasyJet",
        "time": "10:30",
        "status": "Expected 12:45",
        "to": "Bristol"
      },
      {
        "code": "EZY8901",
        "operator": "EasyJet",
        "time": "11:00",
        "status": "Arrived 11:43",
        "to": "London Gatwick"
      },
      {
        "code": "BA492",
        "operator": "BA",
        "time": "11:05",
        "status": "Arrived 11:14",
        "to": "London Heathrow"
      },
      {
        "code": "BA490",
        "operator": "BA",
        "time": "15:30",
        "status": "Scheduled ",
        "to": "London Heathrow"
      },
      {
        "code": "BA2662",
        "operator": "BA",
        "time": "18:40",
        "status": "Scheduled ",
        "to": "London Gatwick"
      },
      {
        "code": "AT990",
        "operator": "RAM85x21",
        "time": "20:00",
        "status": "Scheduled ",
        "to": "Casablanca"
      },
      {
        "code": "EZY8905",
        "operator": "EasyJet",
        "time": "20:35",
        "status": "Scheduled ",
        "to": "London Gatwick"
      }
    ]
  },
  {
    "date": "Friday 2nd of August 2019",
    "events": [
      ...
    ]
  },
  ...
]
```

### GET /arrivals

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Sun, 31 Mar 2019 11:16:45 GMT
Content-Length: 96
Connection: close

[
  {
    "date": "Thursday 1st of August 2019",
    "events": [
      {
        "code": "EZY6299",
        "operator": "EasyJet",
        "time": "2019-08-01T08:10:53.462Z",
        "status": "Expected 12:45",
        "from": "Bristol"
      },
      {
        "code": "EZY8901",
        "operator": "EasyJet",
        "time": "2019-08-01T09:11:53.462Z",
        "status": "Arrived 11:43",
        "from": "London Gatwick"
      },
      {
        "code": "BA492",
        "operator": "BA",
        "time": "2019-08-01T09:11:53.462Z",
        "status": "Arrived 11:14",
        "from": "London Heathrow"
      },
      {
        "code": "BA490",
        "operator": "BA",
        "time": "2019-08-01T13:15:53.462Z",
        "status": "Scheduled ",
        "from": "London Heathrow"
      },
      {
        "code": "BA2662",
        "operator": "BA",
        "time": "2019-08-01T16:18:53.462Z",
        "status": "Scheduled ",
        "from": "London Gatwick"
      },
      {
        "code": "AT990",
        "operator": "RAM85x21",
        "time": "2019-08-01T18:20:53.462Z",
        "status": "Scheduled ",
        "from": "Casablanca"
      },
      {
        "code": "EZY8905",
        "operator": "EasyJet",
        "time": "2019-08-01T18:20:53.462Z",
        "status": "Scheduled ",
        "from": "London Gatwick"
      }
    ]
  },
  {
    "date": "Friday 2nd of August 2019",
    "events": [
      ...
    ]
  },
  ...
]
```
