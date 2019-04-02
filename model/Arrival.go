package model

//Arrival defines the representation of a certain arrival flight
type Arrival struct {
	Code     string `json:"flight"`
	Operator string `json:"operator"`
	Time     string `json:"time"`
	Status   string `json:"status"`
	From     string `json:"from"`
}
