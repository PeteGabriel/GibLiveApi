package endpoints

import (
	"./routes"
	"github.com/go-chi/chi"
	"net/http"
)

var Router;

func init(){
  Router = chi.NewRouter()
}


func SetupRoutes() {

	Router.Get("/alive", routes.HandleRootRoute)
	Router.Get("/live/departures", routes.HandleDepartures)
	Router.Get("/live/arrivals", routes.HandleArrivals)
}