import { Arrival } from "../../src/2domain/model/arrival"
import { Departure } from "../../src/2domain/model/departure";
import { Comparator } from "../../src/2domain/interfaces/comparator";
import { EventComparator } from "../../src/2domain/impl/event_comparator";

describe('EventComparator interface implementation', () => {

  it('should decide correctly when an arrival happens first', () => {

    let a: Arrival = new Arrival({});
    a.time = "2020-09-09T11:11:29.446Z"
    
    let d: Departure = new Departure({})
    d.time= "2020-09-09T15:15:03.515Z"
    
    let comp: Comparator<Arrival, Departure> = new EventComparator()
    let res = comp.compare(a, d)
    expect(res).toBeLessThan(0)
  })

  it('should decide correctly when a departure happens first', () => {

    let a: Arrival = new Arrival({});
    a.time = "2020-09-09T15:15:03.515Z"
    
    let d: Departure = new Departure({})
    d.time= "2020-09-09T11:11:29.446Z"
    
    let comp: Comparator<Arrival, Departure> = new EventComparator()
    let res = comp.compare(a, d)
    expect(res).toBeGreaterThan(0)
  })

  it('should decide correctly when both are equal', () => {

    let a: Arrival = new Arrival({});
    a.time = "2020-09-09T15:15:03.515Z"
    
    let d: Departure = new Departure({})
    d.time= "2020-09-09T15:15:03.515Z"
    
    let comp: Comparator<Arrival, Departure> = new EventComparator()
    let res = comp.compare(a, d)
    expect(res).toEqual(0)
  })

})