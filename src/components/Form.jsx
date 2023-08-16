import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, View, Image, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import { database } from '../database/firebaseC'
import { getStorage, uploadBytesResumable, ref, uploadString, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path } from 'react-native-svg';




const news = [
    'Hurtos o robos', 'Incidentes de unidades', 'Infraestructura perimetral',
    'Control de unidades', 'Resguardo',
];

const hours = ['07 a 19', '19 a 06'];



const CrimeForm = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { control, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState({});
    const navigation = useNavigation();
    const [selectedTipoNovedad, setSelectedTipoNovedad] = useState([]);
    const [selectedPredio, setSelectedPredio] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState([]);
    const [selectedHour, setSelectedHour] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [empresaPredios, setEmpresaPredios] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);
    const storage = getStorage();
    const [selectedImages, setSelectedImages] = useState([]);



    const [progress, setProgress] = useState(0);



    const handleFilePick = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
    
                if (!result.canceled) {
                    if (result.assets.length > 0) {
                        const selectedAssets = result.assets;
                        // Call the uploadImage function for each selected image asset
                        for (const asset of selectedAssets) {
                            await uploadImage(asset.uri, 'image/jpg'); // Adjust the file type as needed
                            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, asset.uri]);
                        }
                    }
                }
            } else {
                console.log('Permission denied to access the gallery');
            }
        } catch (error) {
            console.error('Error in ImagePicker:', error);
        }
    };

    const uploadImage = async(uri, fileType) => {
        const response = await fetch(uri);
        const blob = await response.blob();
    
        const storageRef = ref(storage, "Stuff/" + new Date().getTime());
        const uploadTask = uploadBytesResumable(storageRef, blob);
    
        // listen for events
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress(progress.toFixed()); // Make sure you have a state variable to hold the progress
            },
            (error) => {
                // handle error
                console.error('Error uploading:', error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(storageRef);
                    console.log("File available at:", downloadURL);
                    setUploadedImages((prevUploadedImages) => [...prevUploadedImages, downloadURL]);
                } catch (error) {
                    console.error('Error getting download URL:', error);
                }
            }
        );
    }
    
    const handleFormRestart = () => {
        setSelectedOptions([]);
        setSelectedTipoNovedad([]);
        setSelectedPredio([]);
        setSelectedEmpresa([]);
        setFormData({});

        // Resetea los valores del formulario usando el método reset del useForm
        reset();
    };


    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const empresasSnapshot = await database.collection('empresas').get();
                const empresasData = empresasSnapshot.docs.map((doc) => doc.data());
                setEmpresas(empresasData);
            } catch (error) {
                console.error('Error al cargar las empresas:', error);
            }
        };

        fetchEmpresas();
    }, []);


    const handleFormSubmit = async (data) => {
        try {
            // Crear el objeto de datos a enviar a Firestore
            const dataToSend = {
                vigilador: data.vigilador,
                tipoNovedad: selectedTipoNovedad,
                horaHecho: selectedHour,
                predio: selectedPredio,
                empresa: selectedEmpresa,
                novedad1: data.novedad1,
                predioOtro: formData.predioOtro || '',
                empresaOtro: formData.empresaOtro || '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                archivosAdjuntos: uploadedImages,
            };
    
            // Guardar los datos en Firestore and capture the report ID
            const formRef = await database.collection('form').add(dataToSend);
            const id = formRef.id; // Capture the ID
    
            // Update the id field in the dataToSend object
            dataToSend.idReport = id;
    
            console.log('Form data added to Firestore with ID:', dataToSend.idReport);
            console.log(dataToSend.archivosAdjuntos);
    
            // Navigate to ThankYou screen with report ID
            handleFormRestart();
    
            navigation.navigate('ThankYou', { onFormRestart: handleFormRestart });
        } catch (error) {
            console.error('Error saving form data:', error);
        }
    };
    
    
    
    const handleTipoNovedadChange = (selectedOption) => {
        setSelectedTipoNovedad((prevSelectedTipoNovedad) => {
            if (prevSelectedTipoNovedad.includes(selectedOption)) {
                return prevSelectedTipoNovedad.filter((option) => option !== selectedOption);
            } else {
                return [...prevSelectedTipoNovedad, selectedOption];
            }
        });
    };

    const handlePredioChange = (selectedOption) => {
        setSelectedPredio((prevSelectedPredio) => {
            if (prevSelectedPredio.includes(selectedOption)) {
                return prevSelectedPredio.filter((option) => option !== selectedOption);
            } else {
                return [...prevSelectedPredio, selectedOption];
            }
        });
    };

    const handleEmpresaChange = (selectedOption) => {
        console.log("Selected Option:", selectedOption);

        setSelectedEmpresa((prevSelectedEmpresa) => {
            if (prevSelectedEmpresa.includes(selectedOption)) {
                return prevSelectedEmpresa.filter((option) => option !== selectedOption);
            } else {
                // Buscar la empresa seleccionada en la lista de empresas
                const selectedEmpresa = empresas.find((empresa) => empresa.name === selectedOption);

                if (selectedEmpresa) {
                    // Actualizar la lista de predios con los objectives de la empresa seleccionada
                    setEmpresaPredios(selectedEmpresa.objectives || []);
                } else {
                    setEmpresaPredios([]); // Si no se encuentra la empresa, establecer la lista de predios como vacía
                }

                return [...prevSelectedEmpresa, selectedOption];
            }
        });
    };

    const handleHourChange = (selectedOption) => {
        setSelectedHour((prevSelectedHour) => {
            if (prevSelectedHour.includes(selectedOption)) {
                return prevSelectedHour.filter((option) => option !== selectedOption);
            } else {
                return [...prevSelectedHour, selectedOption];
            }
        });
    };

    return (
        <ScrollView style={styles.containerScroll}>

            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
                        <Path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill="#FDC826"
                        />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Nuevo Reporte
                </Text>
            </View>
            <KeyboardAvoidingView style={styles.box}>

                <Text style={styles.container}>Vigilador de turno</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.containerR}>

                            <TextInput
                                style={styles.input}
                                placeholder="Nombre Completo"
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>
                    )}
                    name="vigilador"
                    rules={{ required: true, maxLength: 100 }}
                    defaultValue=""
                />
            </KeyboardAvoidingView>

         

            {/* Notice Type */}
            <KeyboardAvoidingView style={styles.box}>
                <Text style={styles.container}>Tipo de novedad</Text>
                {news.map((newSuccess, index) => (
                    <View style={styles.containerR}>
                        <TouchableOpacity
                            key={index}
                            style={styles.radio}
                            onPress={() => {
                                handleTipoNovedadChange(newSuccess);
                            }}
                        >
                            <View style={styles.radioCircle}>
                                <Text>
                                    {selectedTipoNovedad.includes(newSuccess) && <View style={styles.selectedRb} />}
                                </Text>
                            </View>
                            <Text style={styles.radioText}>{newSuccess}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <Controller
                    style={styles.box}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <KeyboardAvoidingView style={styles.containerR}>

                            <TextInput
                                style={styles.input}
                                placeholder="Otro"
                                onChangeText={(text) => {
                                    onChange(text);
                                    setFormData((prevData) => ({ ...prevData, tipoNovedadOtro: text }));
                                }}
                                value={value}
                            />
                        </KeyboardAvoidingView>
                    )}
                    name="tipoNovedadOtro"
                    defaultValue=""
                />
            </KeyboardAvoidingView>

            {/* Hora del hecho */}
            <KeyboardAvoidingView style={styles.box}>
                <Text style={styles.container}>Horario de alerta</Text>
                {hours.map((hour, index) => (
                    <View style={styles.containerR}>

                        <TouchableOpacity
                            key={index}
                            style={styles.radio}
                            onPress={() => {
                                handleHourChange(hour)
                            }}
                        >
                            <View style={styles.radioCircle}>
                                <Text>
                                    {selectedHour.includes(hour) && <View style={styles.selectedRb} />}
                                </Text>
                            </View>
                            <Text style={styles.radioText}>{hour}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </KeyboardAvoidingView>


            {/* Empresa */}
            <View style={styles.box}>
                <Text style={styles.container}>Empresa</Text>
                {empresas.map((empresaItem, index) => (
                    <View style={styles.containerR}>
                        <TouchableOpacity
                            key={index}
                            style={styles.radio}
                            onPress={() => {
                                handleEmpresaChange(empresaItem.name);
                            }}
                        >
                            <View style={styles.radioCircle}>
                                <Text>
                                    {selectedEmpresa.includes(empresaItem.name) && <View style={styles.selectedRb} />}
                                </Text>
                            </View>
                            <Text style={styles.radioText}>{empresaItem.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <KeyboardAvoidingView style={styles.containerR}>
                            <TextInput
                                style={styles.input}
                                placeholder="Otro"
                                onChangeText={(text) => {
                                    onChange(text);
                                    setFormData((prevData) => ({ ...prevData, empresaOtro: text }));
                                }}
                                value={value}
                            />
                        </KeyboardAvoidingView>
                    )}
                    name="empresaOtro"
                    defaultValue=""
                />
            </View>


            <View style={styles.box}>
                <Text style={styles.container}>Predio</Text>




                {empresaPredios.map((predio, index) => (
                    <View style={styles.containerR}>

                        <TouchableOpacity

                            key={index}
                            style={styles.radio}
                            onPress={() => {
                                handlePredioChange(predio);
                            }}
                        >
                            <View style={styles.radioCircle}>
                                <Text>
                                    {selectedPredio.includes(predio) && <View style={styles.selectedRb} />}
                                </Text>
                            </View>
                            <Text style={styles.radioText}>{predio}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <KeyboardAvoidingView style={styles.containerR}>

                            <TextInput
                                style={styles.input}
                                placeholder="Otro"
                                onChangeText={(text) => {
                                    onChange(text);
                                    setFormData((prevData) => ({ ...prevData, predioOtro: text }));
                                }}
                                value={value}
                            />
                        </KeyboardAvoidingView>
                    )}
                    name="predioOtro"
                    defaultValue=""
                />

            </View>




            <View style={styles.box}>
                <Text style={styles.container}>Descripcion</Text>
                <Controller
                    control={control}
                    style={styles.container}
                    render={({ field: { onChange, onBlur, value } }) => (

                        <KeyboardAvoidingView style={styles.containerR}>


                            <TextInput
                                style={styles.input}
                                placeholder="Novedad"
                                onChangeText={onChange}
                                value={value}
                            />
                        </KeyboardAvoidingView>
                    )}
                    name="novedad1"
                    rules={{ required: true, maxLength: 80 }}
                    defaultValue=""
                />
            </View>


            <View>
                <Button title="Seleccionar Imagen" onPress={handleFilePick} />
                {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

                <View style={styles.imagePreviewContainer}>
                    {selectedImages.map((imageUri, index) => (
                        <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
                    ))}
                </View>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleFormSubmit)} onPressOut={uploadImage}>
                    <Text style={styles.submitButtonText}>Enviar reporte</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 15,
        color: 'white',
        flex: 1,
        fontSize: 25,
        fontFamily: 'Epilogue-Variable',
        justifyContent: 'center'

    },
    imagePreviewContainer: {
        flexDirection: 'row', // Arrange images in a row
        flexWrap: 'wrap',     // Wrap images to the next line if needed
        marginTop: 20,
    },
    imagePreview: {
        width: 100,
        height: 100,
        margin: 5, // Add some margin between images
    },
    button: {
        flex: 1,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: 245,
        marginTop: 26,
    },
    containerR: {
        flex: 1,
        paddingBottom: 20,
        botton: 0,
        paddingHorizontal: 15,
        flexDirection: 'column', // Cambio el flexDirection a 'column'
        backgroundColor: 'black',
        color: 'white',
        fontSize: 25,
        fontFamily: 'Epilogue-Variable',
        marginBottom: 12, // Añado marginBottom para separar de la sección anterior
    },

    containerScroll: {
        width: '100%',
        padding: 15,
        backgroundColor: 'black',
        fontFamily: 'Epilogue-Variable',
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 800,
        fontFamily: 'Epilogue-Variable',
        paddingLeft: 15,
        paddingHorizontal: 15,

    },
    input: {
        borderRadius: 60,
        height: 40,
        width: 312,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        color: 'white',
        fontFamily: 'Epilogue-Variable',
        backgroundColor: 'black'
    },
    submitButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    submitButtonText: {
        color: 'white',
        fontFamily: 'Epilogue-Variable',
        fontWeight: 'bold',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 30,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        color: 'white',
    },
    radioText: {
        marginLeft: 8,
        color: 'white',
        fontFamily: 'Epilogue-Variable',
        fontSize: 15
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FDC826',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#FDC826',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },

    box: {
        backgroundColor: 'black'
    }
});
export default CrimeForm