import { Comparator } from "../interfaces/comparator";
import { Arrival } from "../model/arrival";
import { Departure } from "../model/departure";

export class EventComparator implements Comparator<Arrival, Departure> {
  
  compare(a: Arrival, d: Departure): number {
    let aa = new Date(a.time)
    let dd = new Date(d.time)
    if (aa > dd) {
      return 1
    }else if (aa < dd){
      return -1
    }else {
      return 0
    }
  }

}