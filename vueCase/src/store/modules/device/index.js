import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
const state = {
  deivces: [],
  selectedDevice: '',
  createDeviceName: '',
  createDeviceCode: '',
  createDeviceLocation: '',
  createDevicePhonenumber: '',
  createDeviceGatewayID: '',
  createDeviceManufacturerName: '',
  createDeviceHardwareModel: '',
  createDeviceFirmwareVersion: '',
  createDeviceNameDetectionResult: '',
  createDeviceCodeDetectionResult: '',
  createDeviceLocationDetectionResult: '',
  createDevicePhonenumberDetectionResult: '',
  allDetectionInformation: '',
  allDeviceInformation: [],
  perpage: 0,
  isResetSortDevice: false
}
export default {
  state,
  getters,
  actions,
  mutations
}
