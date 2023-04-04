# faceumash-import

## About faceumash-import

This tool aids in the management of data import and export for the "faceUmash" application, leveraging Firestore as a storage solution.

## Project set up

```
npm install
mkdir result
```

1. Access the Firebase Console and log in.
2. Navigate to your project's dashboard and click on the gear icon in the left menu to select "Project Settings."
3. In the "General" tab, scroll down to the "App" section.
4. Select the target app (Web, iOS, or Android) and scroll to the "Firebase SDK snippet" section.
5. Choose the "Configuration" option, and the displayed code block will contain the necessary configuration information.
6. Copy this configuration information.

```
mkdir secret && cd secret && touch firebaseConfig.json && pbpaste > firebaseConfig.json
```

Following the instructions at https://firebase.google.com/docs/admin/setup, obtain your secret key and save it as secretkey.json in the result/ directory.

## How to use

### export

Specify the Firestore collection name as an argument, and the tool will export the collection as a JSON file into the result/ directory.

Example:

```
npm run export [collectionname]
```

### import

Specify the JSON file name located under the result/ directory as an argument, and the tool will register the data in Firestore.

Example:

```
npm run import [fileName].json
```

### generate_ratingsJSON

This command outputs a JSON file in the result/ directory, which represents a distributed counter Firestore collection to be registered. The argument is the number of documents.

Example:

```
npm run generate_ratingsJSON [number]
```

### import_ratings

This command uses the JSON file output by generate_ratingsJSON to add a ratings collection to Firestore.

Example:

```
npm run import_ratings
```
