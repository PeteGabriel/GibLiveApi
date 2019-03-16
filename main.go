package main

import (
	"github.com/go-chi/chi"
	"net/http"
)

func main() {
	r := chi.NewRouter()
	r.Get("/", handleRoot)
	http.ListenAndServe(":3000", r)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("welcome"))
}
