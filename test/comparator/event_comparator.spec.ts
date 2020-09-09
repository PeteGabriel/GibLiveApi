import { Arrival } from "../../src/2domain/model/arrival"
import { Departure } from "../../src/2domain/model/departure";
import { Comparator } from "../../src/2domain/interfaces/comparator";
import { EventComparator } from "../../src/2domain/impl/event_comparator";

describe('EventComparator interface implementation', () => {

  it('should decide correctly when a departure happens first', async () => {

    let a: Arrival = new Arrival(
      {
        time: "2020-09-09T11:11:29.446Z"
      });
    
    let d: Departure = new Departure(
      {
        time: "2020-09-09T11:05:29.655Z"
      });
    
    let comp: Comparator<Arrival, Departure> = new EventComparator()
    let res = comp.compare(a, d)
    expect(res).toBeLessThan(0)
  })


  

})