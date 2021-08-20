import {makeObservable, observable, action, flow} from 'mobx'
import {favoritesStore} from './favoritesStore'

import {Api} from '../api'

const api = new Api()

export class RocketsStore {
  isLoading: boolean = true
  rocketsDataStore: any[] = []
  favoritesStore

  constructor() {
    makeObservable(this, {
      rocketsDataStore: observable,
      isLoading: observable,
      loadRockets: flow.bound,
      updateRockets: action.bound,
      setIsLoading: action.bound,
      addToFavorites: action.bound
    })
    this.favoritesStore = favoritesStore
    this.loadRockets()
  }

  updateRockets(item: any[]) {
    this.rocketsDataStore = item
  }

  setIsLoading(status: boolean) {
    this.isLoading = status
  }

  *loadRockets() {
    this.setIsLoading(true)
    yield api.fetchRockets().then((item: any[]) => {
      this.updateRockets(item)
      this.setIsLoading(false)
    })
  }

  addToFavorites(id: string | null) {
    const index = this.rocketsDataStore.findIndex(
      (item: {id: string}) => item.id === id
    )
    this.favoritesStore.addToStore(this.rocketsDataStore[index])
  }
}

export const rocketsStore = new RocketsStore()