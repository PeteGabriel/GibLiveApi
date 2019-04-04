package routes

import (
	"../model"
	"encoding/json"
	"net/http"
)

const mediatype = "application/json"

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", mediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{\"version\": 0.1}"))
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

	flight := model.Flight{Date: "Monday 1st of April 2019", Departures: departure}

	res, err := json.Marshal(flight)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", mediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(res))
}

func HandleArrivals(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", mediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("handleArrivals"))
}

func HandleAllFlights(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", mediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("handleAllFlights"))
}
