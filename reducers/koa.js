
import freeze from 'deep-freeze'

const defaultState = freeze({
    listenStatus: 'down',
    listenPort: null,
})

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'LISTENING':
            return freeze({
                ...state,
                listenStatus: 'up',
                listenPort: action.port,
            })
        case 'LISTEN':
            return freeze({
                ...state,
                listenStatus: 'initializing',
            })
        case 'SHUTDOWN':
            return freeze({
                ...state,
                listenStatus: 'shutdown-in-progress',
            })
        case 'SHUTDOWN_COMPLETE':
            return freeze({
                ...state,
                listenStatus: 'down',
                listenPort: null,
            })
        default:
            return state
    }
}