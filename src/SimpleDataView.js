/* @flow */
import * as reltab from './reltab'

type CmpFn<A> = (x: A, y: A) => number

export default class SimpleDataView {
  rawData: Array<any>
  idMap: Array<any>
  sortCmpFn: ?CmpFn<any>
  schema: ?reltab.Schema

  constructor () {
    this.rawData = []
    this.idMap = []
    this.sortCmpFn = null
    this.schema = null
  }

  getLength (): number {
    return this.rawData.length
  }

  getItem (index: number): any {
    return this.rawData[index]
  }

  getItemMetadata (index: number): any {
    let ret = {}
    const item = this.getItem(index)
    if (!item._isLeaf) {
      ret.cssClasses = 'grid-aggregate-row'
    }
    return ret
  }

  getItemById (id: number): any {
    return this.idMap[id]
  }

  setItems (items: Array<any>): void {
    this.rawData = items
    this.idMap = items.slice()
    this.updateView()
  }

  setSort (cmpFn: ?CmpFn<any>) {
    this.sortCmpFn = cmpFn
    this.updateView()
  }

  updateView () {
    if (this.sortCmpFn) {
      this.sort(this.sortCmpFn)
    }
  }

  sort (cmpFn: CmpFn<any>) {
    this.rawData.sort(cmpFn)
  }
}
