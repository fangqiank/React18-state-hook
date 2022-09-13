import {
  /*useEffect, useState,*/ useSyncExternalStore,
  createContext,
  useContext,
} from 'react'
import { store } from '../src/store'

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        value1: 12,
        value2: 14,
      },
    },
  }
}
const serverContext = createContext()

const useStore = (selector = (state) => state) => {
  // const [state, setState] = useState(selector(store.getState()))

  // useEffect(() => {
  //   store.subscribe(state => setState(selector(state)))
  // }, [])

  // return state

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(useContext(serverContext)),
  )
}

const IncrementValue = ({ item }) => {
  return (
    <button
      onClick={() => {
        const state = store.getState()
        store.setState({
          ...state,
          [item]: state[item] + 1,
        })
      }}
    >
      Increment {item}
    </button>
  )
}

const DisplayValue = ({ item }) => {
  return (
    <div>
      {item}: {useStore((state) => state[item])}
    </div>
  )
}

function App({ initialState }) {
  // console.log(initialState)
  store.serverInit(initialState)
  return (
    <serverContext.Provider value={initialState}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: 600,
          gap: '1rem',
        }}
      >
        <IncrementValue item="value1" />
        <DisplayValue item="value1" />
        <IncrementValue item="value2" />
        <DisplayValue item="value2" />
      </div>
    </serverContext.Provider>
  )
}

export default App
