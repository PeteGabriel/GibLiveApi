package model

import "time"

// Action defines a basic structure for each flight
type Action struct {
	to       string
	from     string
	operator string
	date     time.Time
	flight   string
}
