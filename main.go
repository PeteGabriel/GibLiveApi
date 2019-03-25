package main

import (
	"./routes"
	"./server"
	"github.com/go-chi/chi"
)

func main() {
	server := server.NewInstance()
	r := chi.NewRouter()
	r.Get("/alive", routes.HandleRootRoute)
	r.Get("/live/departures", routes.HandleDepartures)
	r.Get("/live/arrivals", routes.HandleArrivals)

	server.Start(r)
}
