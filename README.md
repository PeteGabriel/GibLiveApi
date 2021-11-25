### Hypermedia API about the flights coming in and out of Gibraltar.

https://gibliveapi.vercel.app/


```
HTTP/1.1 200 OK
Content-Type: application/vnd.collection+json
Date: Sun, 31 Mar 2019 11:16:28 GMT
Content-Length: 16
Connection: close

{
  collection: {
    version: "1.0",
    href: "/",
    links: [
      {
        href: "/departures",
        rel: "departures",
        render: "link"
      },
      {
        href: "/arrivals",
        rel: "arrivals",
        render: "link"
      },
      {
        href: "/next-flight",
        rel: "next-flight",
        render: "link"
      }
    ]
  }
}
```
