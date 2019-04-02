package model

type Flight struct {
	Date string `json:"date"`
	Arrivals []Arrival `json:"arrivals"`
	Departures []Departure `json:"departures"`
}