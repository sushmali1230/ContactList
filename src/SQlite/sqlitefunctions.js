import sqlite from 'react-native-sqlite-storage';

export const db = sqlite.openDatabase(
    {
        name: 'CustomerDB',
        location: 'default'
    }, 
    () => {},
    error => { console.log(error) }
);

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            +"Customers "
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, phone INTEGER)"
        )
    })
}