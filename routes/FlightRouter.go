package routes

import (
	"../model"
	"encoding/json"
	"net/http"
)

const collectionMediatype = "application/vnd.collection+json"

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {

	colJson, err := json.Marshal(nil)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", collectionMediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(colJson))
}

func HandleDepartures(w http.ResponseWriter, r *http.Request) {

	departure := []model.Departure{
		model.Departure{
			"EZY8902",
			"EasyJet",
			"15:15",
			"Departed 15:08",
			"London",
		},
	}

	colJson, err := json.Marshal(departure)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", collectionMediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(colJson))
}

func HandleArrivals(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleArrivals"))
}
