package resources

// Collection hypermedia type is designed to support full read/write capability for simple lists
type collection struct {
	Version string
	Href    string
	Links   []Link
	Items   []Item
}

func NewCollection(version string, href string, items []Item) collection {
	col := collection{Version: version, Href: href, Items: items}
	col.Links = []Link{}
	return col
}
