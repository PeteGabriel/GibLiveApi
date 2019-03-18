package routes

import (
	"net/http"
)

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("HandleRootRoute"))
}

func handleDepartures(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleDepartures"))
}

func handleArrivals(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleArrivals"))
}
