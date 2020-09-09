export interface Comparator<T1, T2> {
  /**
   * Compare two instances of T1 and T2.
   * The return value less than 0 means T1 is "bigger" than T2.
   * 
   * The return value bigger than 0 means T2 is "bigger" than T1.
   * 
   * The return value 0 means T1 is "equal" to T2.
   */
  compare(m1: T1, m2: T2): number
}