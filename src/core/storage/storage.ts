import { MMKV } from 'react-native-mmkv';

const MMKV_STORAGE: string = 'MMKV_STORAGE';
const mmkv: MMKV = new MMKV({
  id: MMKV_STORAGE,
});

export const storage = {
  setitem: (key: string, value: string) => {
    return mmkv.set(key, value);
  },
  getItem: (key: string) => {
    const value: string | undefined = mmkv.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    return mmkv.delete(key);
  },
};
