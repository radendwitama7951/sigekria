import { addRxPlugin } from 'rxdb';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
// import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
// import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

export const environment = {
  production: true,
  apiVersion: '0.1',
  sigekriaApiUrl: 'http://localhost:4000/',
  chatGeminiAPI: 'AIzaSyDxHiUUNJ-Qj92zlEGwJZIga6FtGBiqoP4',

  // isMultiInstanceDB: true,
  // isSSR: true,
  // rxdbSyncUrl: 'localhost:4400',

  // addRxDBPlugins() {
  //   addRxPlugin(RxDBLeaderElectionPlugin);
  // },
  //
  // getRxStorage() {
  //   return wrappedValidateAjvStorage({
  //     storage: getRxStorageDexie(),
  //   });
  // },
};
