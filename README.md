
## Steps to reproduce the error

 1. install dependencies with 'npm install'
 2. build the app with 'tsc'
 3. run the app with 'node ./dist/index'
 4. run the app a second time with 'node ./dist/index'

 The first time, everything is fine. If you execute the app a second time, you will get an error

 ``` javascript
{ Error: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed errno: 19, code: 'SQLITE_CONSTRAINT' } 
```
