import { Comparator } from "../interfaces/comparator";
import { Arrival } from "../model/arrival";
import { Departure } from "../model/departure";

export class EventComparator implements Comparator<Arrival, Departure> {
  
  compare(a: Arrival, d: Departure): number {
    let aa = Date.parse(a.time)
    let dd = Date.parse(d.time)
    console.log(aa)
    console.log(dd)
    console.log(aa - dd)
    return aa - dd  
  }

}