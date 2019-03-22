package routes

import (
	"net/http"
	"encoding/json"
)

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {
	col := Collection{"0.1", "https://github.com/PeteGabriel/GibLiveApi"}
	colJson, err := json.Marshal(col)
	if err != nil{
		panic(err)
	}
	w.Header().Set("Content-Type","application/vnd.collection+json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(colJson))
}

func HandleDepartures(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleDepartures"))
}

func HandleArrivals(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleArrivals"))
}
