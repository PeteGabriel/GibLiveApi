import { Comparator } from "../interfaces/comparator";
import { Arrival } from "../model/arrival";
import { Departure } from "../model/departure";

export class EventComparator implements Comparator<Arrival, Departure> {
  
  compare(a: Arrival, d: Departure): number {
    let aa = new Date(a.getTime())
    let dd = new Date(d.getTime())
    if (aa > dd) {
      if (a.getStatus().includes("Arrived")){
        return -1
      }
      return 1
    }else if (aa < dd){
      if (d.getStatus().includes("Departed")){
        return 1
      }
      return -1
    }else {
      return 0
    }
  }

}