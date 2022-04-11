import { StyleSheet, Dimensions } from 'react-native';
import { RedColor } from './AppColors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    dialogContainer: {
        height: 400,
        padding: 10
    },
    listCard: {
        elevation: 3,
        marginVertical: 14,
        height: 80,
        width: Dimensions.get('screen').width-40,
        marginHorizontal: 20
    },
    listCardInside: {
        flexDirection: 'row'
    },
    listcontainer: {
        padding: 12,
        height: 80,
        flex: 5
    },
    listIconHolder: {
        backgroundColor: RedColor,
        height: 80,
        alignItems: 'center',
        paddingVertical: 30,
        flex: 1
    },
    titleTextBold: {
        fontSize: 30,
        fontWeight: '700',
        marginVertical: 40,
        color: 'black'
    },
    textBold: {
        fontSize: 13,
        color: 'black',
        fontWeight: '700',
        marginBottom: 3
    },
    textNormal: {
        fontSize: 11,
        color: 'black',
        marginVertical: 2
    },
    textDOB: {
        fontSize: 11,
        color: 'black',
        marginVertical: 18
    },
    addContactButton: {
        position: 'absolute',
        bottom: 60,
        right: 30
    },
    textInputLayout: {
        borderRadius: 15,
        borderColor: 'black',
        width: Dimensions.get('screen').width-120,
        borderWidth: 0.5,
        paddingVertical: 3,
        paddingHorizontal: 13,
        marginVertical: 15,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    ButtonLayout: {
        backgroundColor: '#fe019a',
        width: Dimensions.get('screen').width-120,
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        fontWeight: '700',
        marginTop: 15,
        marginBottom: 23,
        padding: 13,
        borderRadius: 15
    },
    ViewSeperator: {
        height: 20
    },
    DialogCloseBtn: {
        position: 'absolute',
        top: 10,
        right: 20
    },
    NoDataImage: {
        width: Dimensions.get('screen').width,
        height: 200,
        marginTop: 100,
        resizeMode: 'contain'
    },
    NoDataText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center'
    }
})

export { styles };