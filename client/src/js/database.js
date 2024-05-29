import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const notes = "jate";

const initdb = async () =>
  openDB(notes, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(notes)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(notes, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  const db = await openDB(notes, 1);

  // Now create a variable for the transaction; again, this will be referenced below.
  const tx = db.transaction(notes, 'readwrite');

  // Now create a variable for the store
  const store = tx.objectStore(notes);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  // You can duplicate the same lines of code from above, except that the transaction will be 'readonly'
  const db = await openDB(notes, 1);
  const tx = db.transaction(notes, 'readonly');
  const store = tx.objectStore(notes);

  // Leave the rest as-is
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();