export interface Comparator<T1, T2> {
  compare(m1: T1, m2: T2): number
}