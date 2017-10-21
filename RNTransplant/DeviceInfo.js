
import {
  NativeModules
} from 'react-native';

export default
{
  'systemName':NativeModules.RNDeviceInfo.systemName,
  'systemVersion':NativeModules.RNDeviceInfo.systemVersion,
  'defaultLanguage':NativeModules.RNDeviceInfo.deviceLocale,
  'appVersion':NativeModules.RNDeviceInfo.appVersion,

}
