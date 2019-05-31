package routes

import (
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAlive(t *testing.T) {
	request, _ := http.NewRequest("GET", "/alive", nil)
	response := httptest.NewRecorder()
	HandleRootRoute(response, request)

	body, _ := ioutil.ReadAll(response.Body)

	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.JSONEq(t, "{\"version\": 0.1}", string(body))
	assert.Equal(t, "application/json", response.Header().Get("Content-Type"), "Mediatype must be application/json")
}

func TestRoot(t *testing.T) {
	request, _ := http.NewRequest("GET", "/", nil)
	response := httptest.NewRecorder()
	HandleRootRoute(response, request)

	body, _ := ioutil.ReadAll(response.Body)
	expectedOutcome := fmt.Sprintf(`{
    "alive":{"method":%s,"uri":%s},
		"departures":{"method":%s,"uri":%s},
		"arrivals":{"method":%s,"uri":%s}
	}`, "GET", "/alive", "GET", "/live/departures", "GET", "/live/arrivals")

	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.JSONEq(t, expectedOutcome, string(body))
	assert.Equal(t, "application/json", response.Header().Get("Content-Type"), "Mediatype must be application/json")
}

func TestDeparturesEndpoint(t *testing.T) {
	request, _ := http.NewRequest("GET", "/live/departures", nil)
	response := httptest.NewRecorder()
	HandleDepartures(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.NotEmpty(t, response.Body)
	assert.Equal(t, "application/json", response.Header().Get("Content-Type"), "Mediatype must be application/json")
}

func TestArrivalsEndpoint(t *testing.T) {
	request, _ := http.NewRequest("GET", "/live/arrivals", nil)
	response := httptest.NewRecorder()
	HandleArrivals(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.NotEmpty(t, response.Body)
	assert.Equal(t, "application/json", response.Header().Get("Content-Type"), "Mediatype must be application/json")
}
