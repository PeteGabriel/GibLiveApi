package middleware

import (
	"fmt"
	"net/http"
)

// Middleware function to log info about the request
func Log(f http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.Method + " " + r.RequestURI)
		f.ServeHTTP(w, r)
	})
}
