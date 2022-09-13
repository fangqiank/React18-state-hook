const createStore = (initState) => {
  let currentState = initState
  const listeners = new Set()
  let isInit = false

  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState
      listeners.forEach((listener) => listener(currentState))
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    serverInit: (initState) => {
      if (!isInit) {
        currentState = initState
        isInit = true
      }
    },
  }
}

export const store = createStore({
  value1: 0,
  value2: 0,
})
