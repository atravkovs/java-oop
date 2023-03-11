import { Device } from "./device.model";

export interface NewDeviceResponse {
  device: Device;
  token: string;
}
