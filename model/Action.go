package model

import "time"

// Action defines a basic structure for each flight
type Action struct {
	code     string
	operator string
	time     time.Time
	status   string
}
