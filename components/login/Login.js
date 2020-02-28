import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../../assets/icon.png';

const {width: WIDTH} = Dimensions.get('window');

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo}/>
                <Text style={styles.logoText}>Empress</Text>
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'person'} size={24} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder={'Username'}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underLineColorAndroid='transparent'
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name={'lock-outline'} size={24} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    secureTextEntry={showPass}
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    underLineColorAndroid='transparent'
                />
                <TouchableOpacity style={styles.btnEye} onPress={() => setShowPass(!showPass)}>
                    <Icon name={showPass ? 'visibility' : 'visibility-off'} size={24} color={'rgba(255, 255, 255, 0.7)'}
                          style={styles.btnEye}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({

    backgroundContainer: {
        flex: 1,
        backgroundColor: '#3399ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 20,
        opacity: 0.5
    },
    logo: {
        width: 120,
        height: 120
    },
    inputContainer: {
        marginTop: 10
    },
    input: {
        width: WIDTH - 55,
        height: 25,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 0,
        left: 33
    },
    btnEye: {
        // position: 'absolute',
        marginLeft: 12,
        bottom: 12.5,
        right: 16,
        alignSelf: 'flex-end'
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 25,
        borderRadius: 45,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center'
    }
});


export default Login;