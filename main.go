package main

import (
	"./routes"
	"github.com/go-chi/chi"
	"log"
	"net/http"
)

func main() {
	r := chi.NewRouter()
	r.Get("/alive", routes.HandleRootRoute)
	r.Get("/live/departures", routes.HandleDepartures)
	r.Get("/live/arrivals", routes.HandleArrivals)
	log.Fatal(http.ListenAndServe(":3000", r))
}
