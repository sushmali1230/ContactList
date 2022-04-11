import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, PermissionsAndroid, ToastAndroid, Image } from 'react-native';
import CardView from 'react-native-cardview';
import { styles } from '../../components/Styles/style';
import EditCustomer from '../../../assets/Icons/editcustomer';
import AddCustomer from '../../../assets/Icons/addcustomer';
import NameCustomer from '../../../assets/Icons/namecustomer';
import DOBCustomer from '../../../assets/Icons/dobcustomer';
import PhoneCustomer from '../../../assets/Icons/phonecustomer';
import SearchCustomer from '../../../assets/Icons/searchcustomer';
import CloseCustomerDialogButton from '../../../assets/Icons/closecustomerdialog';
import { Dialog } from 'react-native-simple-dialogs';
import { GreyColor } from '../../components/Styles/AppColors';
import { db, createTable, DataAdd, DataFetch } from '../../SQlite/sqlitefunctions';
import { TextInputMask } from 'react-native-masked-text';

const renderContact = ({ item }) => {
    return (
        <CardView style={styles.listCard}>
            <View style={styles.listCardInside}>
                <View style={styles.listcontainer}>
                    <Text style={styles.textBold}>{item.name}</Text>
                    <Text style={styles.textNormal}>{item.dob}</Text>
                    <Text style={styles.textNormal}>{item.phone}</Text>
                </View>
                <TouchableOpacity style={styles.listIconHolder}>
                    <EditCustomer width={20} height={20} />
                </TouchableOpacity>
            </View>
        </CardView>
    )
}

const request_runtime_permission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
            'title': 'ReactNativeCode Write Permission',
            'message': 'ReactNativeCode App needs access to write data '
            }
        );
        const granted1 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
            'title': 'ReactNativeCode Read Permission',
            'message': 'ReactNativeCode App needs access to read data '
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            if (granted1 === PermissionsAndroid.RESULTS.GRANTED) {
                createTable();
            }
            else {
                console.log("Storage Permission Not Granted");
            }   
        }
        else {
            console.log("Camera Permission Not Granted");
        }
    } catch (err) {
        console.warn(err)
    }
}



const Dashboard = () => {
    const [allcontacts, setAllContacts] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [dialogAddCustomerBool, setDialogAddCustomerBool] = useState(false);
    const [noDataBool, setNoDataBool] = useState(false);
    const [customerNameSearch, setCustomerNameSearch] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerDOB, setCustomerDOB] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");

    useEffect(() => {
        request_runtime_permission();
        getData();
    },[]);

    const AddData = async () => {
        if (customerName.trim() === "") {
            ToastAndroid.show("Please add proper customer name.", ToastAndroid.SHORT);
        } else if (customerMobile.trim() === "") {
            ToastAndroid.show("Please add proper customer phone number.", ToastAndroid.SHORT);
        } else if (customerMobile.trim().length < 10) {
            ToastAndroid.show("Please add proper customer phone number.", ToastAndroid.SHORT);
        } else if (customerDOB.trim().length < 10) {
            ToastAndroid.show("Please add proper customer date of birth.", ToastAndroid.SHORT);
        } else {
            DataAdd(customerName, customerDOB, customerMobile);
            ToastAndroid.show("Customer Added", ToastAndroid.SHORT);
            setCustomerName("");
            setCustomerMobile("");
            setCustomerDOB("");
            setDialogAddCustomerBool(false);
            getData();
        }
    }

    function searchText (e) {
        let text = e.toLowerCase()
        let customerscontacts = contacts
        let filteredName = customerscontacts.filter((item) => {
          return item.name.toLowerCase().match(text)
        })
        if (!text || text === '') {
            setContacts(allcontacts)
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            // set no data flag to true so as to render flatlist conditionally
            setNoDataBool(true);
            setContacts([])
        } else if (Array.isArray(filteredName)) {
            setNoDataBool(false);
            setContacts(filteredName)
        }
    }

    function getData () {
        try {
            db.transaction(async (tx) => {
                
                tx.executeSql(
                    "SELECT name, dob, phone FROM Customers",[],
                    (tx, results) => {
                        var tempResult = [];
                        var i = 0;
                        for (i = 0; i < results.rows.length; i++) {
                            tempResult.push(results.rows.item(i))
                        }
                        setAllContacts(tempResult);
                        setContacts(tempResult);
                        if (tempResult.length === 0) {
                            setNoDataBool(true)
                        } else {
                            setNoDataBool(false)
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }    
    }

    return (
        <View style={styles.container}>
            <Dialog
                visible={dialogAddCustomerBool}
                onTouchOutside={() => setDialogAddCustomerBool(false)}>
                <View style={styles.dialogContainer}>
                    <Text style={styles.textBold}>Add Customer</Text>
                    <View style={styles.ViewSeperator}></View>
                    <View style={styles.textInputLayout}>
                        <NameCustomer width={25} height={25} marginVertical={15} marginRight={12}/>
                        <TextInput
                            style={styles.textNormal}
                            value={customerName}
                            placeholderTextColor={GreyColor}
                            placeholder="Enter Customer Name"
                            onChangeText={(text) => setCustomerName(text)}
                            numberOfLines={1}>

                        </TextInput>
                    </View>
                    <View style={styles.textInputLayout}>
                        <PhoneCustomer width={25} height={25} marginVertical={15} marginRight={12}/>
                        <TextInput
                            style={styles.textNormal}
                            value={customerMobile}
                            placeholderTextColor={GreyColor}
                            placeholder="Enter Customer Mobile"
                            onChangeText={(text) => setCustomerMobile(text)}
                            numberOfLines={1}
                            maxLength={13}
                            keyboardType="number-pad">

                        </TextInput>
                    </View>
                    <View style={styles.textInputLayout}>
                        <DOBCustomer width={25} height={25} marginVertical={15} marginRight={12}/>
                        <TextInputMask
                            style={styles.textNormal}
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={customerDOB}
                            placeholderTextColor={GreyColor}
                            placeholder="Select Customer DOB"
                            onChangeText={(text) => setCustomerDOB(text)}
                            numberOfLines={1}>

                        </TextInputMask>
                    </View>
                    <TouchableOpacity onPress={() => AddData()}>
                        <Text style={styles.ButtonLayout}>Add Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DialogCloseBtn} onPress={() => setDialogAddCustomerBool(false)}>
                        <CloseCustomerDialogButton height={25} width={25}/>
                    </TouchableOpacity>
                </View>
            </Dialog>
            <Text style={styles.titleTextBold}>Customers</Text>
            <View style={styles.textInputLayout}>
                <SearchCustomer width={23} height={23} marginVertical={15} marginLeft={8} marginRight={12}/>
                <TextInput
                    style={styles.textNormal}
                    value={customerNameSearch}
                    placeholderTextColor={GreyColor}
                    placeholder="Search Customer Name..."
                    onChangeText={(text) => {setCustomerNameSearch(text), searchText(text)}}
                    numberOfLines={1}>

                </TextInput>
            </View>
            {noDataBool === true ? 
            <View>
                <Image style={styles.NoDataImage} source={require('../../../assets/Images/data-not-found.png')}></Image>
                <Text style={styles.NoDataText}>No Customers Found</Text>
            </View>
            :
            <FlatList
                data={contacts}
                renderItem={renderContact}/>}
            <TouchableOpacity style={styles.addContactButton} onPress={() => setDialogAddCustomerBool(true)}>
                <AddCustomer width={65} height={65}/>
            </TouchableOpacity>
        </View>
    )
}

export { Dashboard }