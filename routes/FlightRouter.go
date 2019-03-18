package routes

import (
	"net/http"
)

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("HandleRootRoute"))
}

func HandleDepartures(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleDepartures"))
}

func HandleArrivals(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleArrivals"))
}
