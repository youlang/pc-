import request from '../inderface.js'
export default {
    getUserInfo (data) {
        return request.post('/api/DefaultRequest/In', data)
    }
}