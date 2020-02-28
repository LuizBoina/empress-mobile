import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import mapStyle from './mapStyle';
const { width, height } = Dimensions.get("window");

const Map = () => {
    const initialMapData = {
        stores: [],
        isLoading: false,
        errorMessage: '',
        storeSelected: false
    };
    const initialStoreData = {
        isActivated: true,
        storeAdmin: "",
        code: "",
        cnpj: "",
        lat: "",
        lng: "",
        options: [],
        acceptPicPay: false,
        picPayAccount: "",
        email: "",
        name: "",
        phoneNumber: ""
    };
    const [mapData, setMapData] = useState(initialMapData);
    const [storeData, setStoreData] = useState(initialStoreData);
    const StoresFetch = () => {
        useEffect(() => {
            setMapData({
                ...mapData,
                isLoading: true,
                isStoreSelected: false,
            });
            const requestBody = {
                query: `
                query Stores {
                    stores {
                        _id
                        code
                        isActivated
                        latLng {
                            lat
                            lng
                        }
                        storeAdmin {
                            _id
                            name
                        }
                    }
                }
            `
            };
            const storesFetch = async () => {
                const response = await (await fetch('http://10.0.2.2:8000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })).json();
                setMapData({
                    ...mapData,
                    stores: response.errors ? [] : response.data.stores,
                    isLoading: false
                });
            };
            storesFetch();
        }, []);
    };
    const showStore = async (storeId) => {
        setMapData({
            ...mapData,
            isLoading: true,
        });
        const storeReqBody = {
            query: `
                    query Store($id: ID!) {
                        store(id: $id) {
                            _id
                            cnpj
                            acceptPicPay
                            picPayAccount
                            isActivated
                            latLng {
                                lat
                                lng
                            }
                            options {
                              name
                              price
                            }
                            storeAdmin {
                                _id
                                 name
                                 email
                                 phoneNumber
                                 password
                            }
                        }
                    }
                `,
            variables: {
                id: storeId
            }
        };
    const response = await(await fetch('http://10.0.2.2:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(storeReqBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();
    setStoreData({
        storeAdmin: response.data.store.storeAdmin,
        cnpj: response.data.store.cnpj,
        lat: response.data.store.latLng.lat,
        lng: response.data.store.latLng.lng,
        isActivated: response.data.store.isActivated,
        acceptPicPay: response.data.store.acceptPicPay,
        picPayAccount: response.data.store.picPayAccount,
        options: response.data.store.options,
        email: response.data.store.storeAdmin.email,
        name: response.data.store.storeAdmin.name,
        phoneNumber: response.data.store.storeAdmin.phoneNumber,
        password: response.data.store.storeAdmin.password
    });
    setMapData({
        ...mapData,
        isLoading: false,
        storeSelected: true
    });
    };
    const renderMarkers = () => {
        if(!mapData.storeSelected)
            return (
                <View>
                    {
                        mapData.stores.map((store, idx) => {
                            const latitude = parseFloat(store.latLng.lat);
                            const longitude = parseFloat(store.latLng.lng);
                            return (
                                <Marker
                                    key={idx}
                                    coordinate={{latitude, longitude}}
                                    onPress={() => showStore(store._id)}
                                />
                            )
                        })
                    }
                </View>
            )
    };
    StoresFetch();
    return (
        <View>
        { mapData.storeSelected ?
            <View>
                <Text>{JSON.stringify(storeData)}</Text>
            </View> :
            <View style={styles.container}>
                <MapView style={styles.map}
                         provider={PROVIDER_GOOGLE}
                         showsMyLocationButton={false}
                         showsPointsOfInterest={false}
                         showsCompass={false}
                         showsScale={false}
                         customMapStyle={mapStyle}
                         loadingEnabled={true}
                         zoomEnabled={true}
                         region={{
                             latitude: -20.277113,
                             longitude: -40.301446,
                             latitudeDelta: 0.015,
                             longitudeDelta: 0.0121,
                         }}>
                    {renderMarkers()}
                </MapView>
            </View> }
        </View>)
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute'
    },
    map: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        width : width,
        height : height
    }
});

export default Map;