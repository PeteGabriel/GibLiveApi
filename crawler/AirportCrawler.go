package crawler

import (
	"fmt"
	"github.com/anaskhan96/soup"
	"os"
)

func GetDoc() soup.Root {
	resp, err := soup.Get("https://www.gibraltarairport.gi/content/live-flight-info")
	if err != nil {
		fmt.Println("Could not obtain html from web")
		os.Exit(1)
	}
	return soup.HTMLParse(resp)
}
