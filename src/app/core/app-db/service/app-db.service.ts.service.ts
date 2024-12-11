import { Injectable, Injector, Signal, untracked } from '@angular/core';
import {
  DATABASE_NAME,
  NEWS_CONTENT_COLLECTION_NAME,
} from '../constant/app-db.const';
import {
  NEWS_CONTENT_SCHEMA,
  RxNewsContentDocumentType,
} from '../schema/news-content.schema';
import { environment } from '../../../../environments/environment.development';
import {
  RxNewsContentCollections,
  RxNewsContentDatabase,
  RxNewsContentDocument,
} from '../rxdb';
import { createRxDatabase } from 'rxdb';
// import { RxReactivityFactory } from 'rxdb/plugins/core';
import { toSignal } from '@angular/core/rxjs-interop';

const collectionSettings = {
  [NEWS_CONTENT_COLLECTION_NAME]: {
    schema: NEWS_CONTENT_SCHEMA,
    methods: {},
    sync: false,
  },
};

function doSync(): boolean {
  if (environment.isSSR) return false;

  if (window.location.hash == '#nosync') return false;

  return true;
}

async function _create(injector: Injector): Promise<RxNewsContentDatabase> {
  // environment.addRxDBPlugins();

  console.log('[AppDBService] creating database...');

  // const reactivityFactory: RxReactivityFactory<Signal<any>> = {
  //   fromObservable(obs, initialValue: any) {
  //     return untracked(() =>
  //       toSignal(obs, { initialValue, injector, rejectErrors: true }),
  //     );
  //   },
  // };

  // const db = await createRxDatabase<RxNewsContentCollections>({
  //   name: DATABASE_NAME,
  //   storage: environment.getRxStorage(),
  //   multiInstance: environment.isMultiInstanceDB,
  //   // reactivity: reactivityFactory,
  //   // ignoreDuplicate: !environment.production,
  // });
  //
  // console.log('[AppDBService] database created!');
  // if (!environment.isSSR) (window as any)['db'] = db;
  //
  // if (environment.isMultiInstanceDB)
  //   db.waitForLeadership().then(() => {
  //     console.log('isLeader now');
  //     document.title = `8==D ${document.title}`;
  //   });
  //
  // // Create Collections
  // console.log('[AppDBService] creating collections..');
  // await db.addCollections(collectionSettings);
  //
  // // hooks
  // console.log('[AppDBService] adding hooks..');
  //
  // db.collections.news_content.preInsert(
  //   async (docObj: RxNewsContentDocumentType) => {
  //     const id = docObj.id;
  //     return db.collections.news_content
  //       .findOne({
  //         selector: {
  //           id,
  //         },
  //       })
  //       .exec()
  //       .then((has: RxNewsContentDocument | null) => {
  //         if (has != null) {
  //           alert(`${id} has been taken!`);
  //           throw new Error('[AppDBService] pre Insert conflicted id');
  //         }
  //         return db;
  //       });
  //   },
  //   false,
  // );

  // [isNot]
  if (/*doSync()*/ false) {
    console.log('[AppDBService] syncing database...');
    // await Promise.all(
    //   Object.values(db.collections).map(async (col) => {
    //     try {
    //       // create couch DB
    //       await fetch(environment.rxdbSyncUrl + col.name + '/', {
    //         method: 'PUT',
    //       });
    //     } catch (err) {}
    //   }),
    // );
  }

  /*
   * SSR
   * */
  if (environment.isSSR) {
    console.log(
      '[AppDBService] awaiting initial replication to ensure SSR has all data...',
    );
    /* Do Replication Logic */
    // const firstReplication = await replicateCouchDB({
    //   replicationIdentifier: 'couch-server-side-sync',
    //   collection: db.news_content,
    //   url: environment.rxdbSyncUrl + db.news_content.name + '/',
    //   live: false,
    //   pull: {},
    //   push: {},
    // });
    // await firstReplication.awaitInitialReplication();
  }

  /* DB Replication logic */
  // console.log('[AppDBService] starting replication...');
  // const ongoingReplication = replicateCouchDB({
  //   replicationIdentifier: 'couch-client-side-sync',
  //   collection: db.news_content.name,
  //   url: environment.rxdbSyncUrl + db.news_content.name + '/',
  //   live: true,
  //   pull: {},
  //   push: {},
  // });
  // ongoingReplication.error$.subscribe((err) => {
  //   console.log('Got replication error:');
  //   console.dir(err);
  //   console.error(err);
  // });
  console.log('[AppDBService] database created !');

  // return db as any;
}

let initState: null | Promise<any> = null;
let DB_INSTANCE: RxNewsContentDatabase;

export async function initDatabase(injector: Injector) {
  if (!injector)
    throw new Error('[AppDBService] initDatabase missing injector !');

  /**
   * When server side rendering is used,
   * The database might already be there
   */
  if (!initState) {
    console.log('initDatabase()');
    initState = _create(injector).then((db) => (DB_INSTANCE = db));
  }
  await initState;
}

@Injectable({
  providedIn: 'root',
})
export class AppDBService {
  get db(): RxNewsContentDatabase {
    return DB_INSTANCE;
  }
}
