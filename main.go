package main

import (
	"github.com/go-chi/chi"
	"net/http"
)

func main() {
	r := chi.NewRouter()
	r.Get("/alive", HandleRootRoute)
	// r.Get("/live/departures", handleDepartures)
	// r.Get("/live/arrivals", handleArrivals)
	http.ListenAndServe(":3000", r)
}
