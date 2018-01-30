import Promise from 'bluebird'
import {
    createStore,
    applyMiddleware,
} from 'redux'
import createSaga from 'redux-saga'
import koa from './reducers/koa'
import { listen, shutdown, restart } from './services/koa'


const saga = createSaga()
const store = createStore(koa, applyMiddleware(saga))
store.subscribe(() => console.log(store.getState()))
saga.run(function* () {
    yield listen(3000)
    yield Promise.delay(3000)
    yield shutdown()
    yield Promise.delay(3000)
    yield listen(3000)
    yield Promise.delay(3000)
    yield restart()
})