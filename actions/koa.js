import Promise from 'bluebird'
import { call, put, select } from 'redux-saga/effects'

import http from 'http'
import destroyable from 'server-destroy'
import Koa from 'koa'
import freeze from 'deep-freeze'

let server

function* listen(port) {
    if (yield select(getListenStatus) === 'initializing') {
        console.error('cannot listen while initializing')
    } else {
        yield call(doListen, port)
        yield put({ type: 'LISTENING' });
    }
}

function* shutdown() {
    if (yield select(getListenStatus) === 'up') {
        server.destroy()
        return put({ type: 'SHUTDOWN' })
    } else {
        console.error('cannot shutdown unless listenStatus is \'up\'')
        return
    }

}

// https://github.com/koajs/koa/issues/659
// https://www.npmjs.com/package/server-destroy
async function doListen(port) {
    const app = new Koa()
    server = http.createServer(app.callback())
    await Promise.fromCallback(server.listen.bind(server, port))
    destroyable(server)
}

// state plucker
function getListenStatus(state) {
    return state.listenStatus
}