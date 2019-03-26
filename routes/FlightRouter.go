package routes

import (
	"../resources"
	"encoding/json"
	"net/http"
)

const collectionMediatype = "application/vnd.collection+json"

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {

	col := resources.NewCollection(
		"0.1",
		"https://github.com/PeteGabriel/GibLiveApi",
		[]resources.Item{resources.Item{""}},
	)

	colJson, err := json.Marshal(col)
	if err != nil {
		panic(err)
	}
	w.Header().Set("Content-Type", collectionMediatype)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(colJson))
}

func HandleDepartures(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleDepartures"))
}

func HandleArrivals(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("handleArrivals"))
}
