import request from '../inderface.js'
export default {
    getToken (data) {
        return request.post('/api/LoginRequest/Token', data,'')
    },
    LoginRequest_Id (data) {
        return request.post('/api/LoginRequest/Id', data)
    },
    login_define (data) {
        return request.post('/api/LoginRequest/Define', data)
    },
    PlateCorRequest_Add (data) {
        return request.get('/api/PlateCorRequest/Add', data)
    },
    PlateCorRequest_Update (data) {
        return request.get('/api/PlateCorRequest/Update', data)
    },
    PlateCorRequest_Delete (data) {
        return request.get('/api/PlateCorRequest/Delete', data)
    },
    PlateCorRequest_GetAll (data) {
        return request.get('/api/PlateCorRequest/GetAll', data)
    },
    PlateCorRequest_Get (data) {
        return request.get('/api/PlateCorRequest/Get', data)
    },
    PlateCorRequest_UpdateSecret (data) {
        return request.get('/api/PlateCorRequest/UpdateSecret', data)
    },
    PlateMenuRequest_Add (data) {
        return request.post('/api/PlateMenuRequest/Add', data)
    },
    PlateMenuRequest_Update (data) {
        return request.post('/api/PlateMenuRequest/Update', data)
    },
    PlateMenuRequest_Delete (data) {
        return request.post('/api/PlateMenuRequest/Delete', data)
    },
    PlateMenuRequest_GetAll (data) {
        return request.post('/api/PlateMenuRequest/GetAll', data)
    },
    PlateMenuRequest_GetAllFromParentID (data) {
        return request.post('/api/PlateMenuRequest/GetAllFromParentID', data)
    },
    PlateMenuRequest_Get (data) {
        return request.post('/api/PlateMenuRequest/Get', data)
    },

}