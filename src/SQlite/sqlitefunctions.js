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

export const DataAdd = async (customerName, customerDOB, customerMobile) => {
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO Customers (name, dob, phone) VALUES (?,?,?)",[customerName, customerDOB, customerMobile]
            )
        });
    } catch (error) {
        console.log(error);
    }
}

