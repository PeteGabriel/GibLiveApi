package server

import (
	"log"
	"net/http"
)

type Instance struct {
	httpServer *http.Server
}

func NewInstance() *Instance {
	s := &Instance{}
	return s
}

func (s *Instance) Start() {
	// Startup the http Server in a way that
	// we can gracefully shut it down again
	s.httpServer = &http.Server{Addr: ":3000", Handler: nil}
	err := s.httpServer.ListenAndServe() //blocks

	if err != http.ErrServerClosed {
		log.Fatal("Http Server stopped unexpected")
	} else {
		log.Panic(err)
	}
	s.Shutdown()
}

func (s *Instance) Shutdown() {
	// if theres a server intance running
	// shutdown.
	if s.httpServer != nil {
		err := s.httpServer.Shutdown(nil)
		if err != nil {
			log.Fatal(err)
		} else {
			s.httpServer = nil
			log.Println("Server is down.")
		}
	}
}
