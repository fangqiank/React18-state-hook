const createStore = (initState) => {
  let currentState = initState
  const listeners = new Set()
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
  }
}

export const store = createStore({
  value1: 0,
  value2: 0,
})
