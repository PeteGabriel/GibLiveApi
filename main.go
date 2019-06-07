package main

import (
	"github.com/PeteGabriel/GibLiveApi/crawler"
)

func main() {

	crawler.GetDoc()

	/*server := server.NewInstance()
	r := chi.NewRouter()
	r.Get("/", middleware.Log(routes.HandleRootRoute))
	r.Get("/alive", middleware.Log(routes.HandleAliveRoute))
	r.Get("/live/departures", middleware.Log(routes.HandleDepartures))
	r.Get("/live/arrivals", middleware.Log(routes.HandleArrivals))
	r.Get("/live/arrivals", routes.HandleArrivals)
	*/
	//server.Start(r)

}
