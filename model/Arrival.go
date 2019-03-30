package model

//Arrival defines the representation of a certain arrival flight
type Arrival struct {
	Code     string
	Operator string
	Time     string
	Status   string
	From     string
}
