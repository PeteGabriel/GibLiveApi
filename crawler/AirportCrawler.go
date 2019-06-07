package crawler

import (
	"fmt"
	"os"

	"github.com/anaskhan96/soup"
)

func GetDoc() soup.Root {
	resp, err := soup.Get("https://www.gibraltarairport.gi/content/live-flight-info")
	if err != nil {
		fmt.Println("Could not obtain html from web")
		os.Exit(1)
	}
	s := soup.HTMLParse(resp)
	//titleHeader := s.Find("h1", "class", "mt--")
	//fmt.Println(titleHeader.Text())

	//tableHeaders := s.Find("table", "class", "mt").FindAll("th")
	//fmt.Println(table.Text())

	tableRows := s.Find("table", "class", "mt").Find("tbody").FindAll("tr")
	for _, elem := range tableRows {
		for _, e := range elem.FindAll("td") {
			fmt.Print(e.Text() + " - ")
		}
		fmt.Println()
	}
	return s
}
