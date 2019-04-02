package model

//Departure defines the representation of a certain departure
type Departure struct {
	Code     string `json:"flight"`
	Operator string `json:"operator"`
	Time     string `json:"time"`
	Status   string `json:"status"`
	To       string `json:"to"`
}
