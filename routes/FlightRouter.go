package routes

import (
	"net/http"
)

func HandleRootRoute(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome"))
}