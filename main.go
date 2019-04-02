package main

import (
	"./middleware"
	"./routes"
	"./server"
	"github.com/go-chi/chi"
)

func main() {
	server := server.NewInstance()
	r := chi.NewRouter()
	r.Get("/alive", middleware.Log(routes.HandleRootRoute))
	r.Get("/live/departures", middleware.Log(routes.HandleDepartures))
	r.Get("/live/arrivals", middleware.Log(routes.HandleArrivals))
	r.Get("/live/arrivals", routes.HandleArrivals)

	server.Start(r)
}
