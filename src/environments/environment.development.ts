import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
// import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
// import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';

export const environment = {
  production: false,
  apiVersion: '0.1',
  sigekriaApiUrl: 'http://localhost:4000/',
  chatGeminiAPI: 'AIzaSyDxHiUUNJ-Qj92zlEGwJZIga6FtGBiqoP4',

  // RxDB stuff
  isMultiInstanceDB: true,
  isSSR: true,
  rxdbSyncUrl: 'localhost:4400',

  // addRxDBPlugins() {
  //   addRxPlugin(RxDBDevModePlugin);
  //   addRxPlugin(RxDBLeaderElectionPlugin);
  // },
  //
  // getRxStorage() {
  //   return wrappedValidateAjvStorage({
  //     storage: getRxStorageDexie(),
  //   });
  // },
};
