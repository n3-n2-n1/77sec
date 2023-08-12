import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, View, Image,KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import { database } from '../database/firebaseC'
import storage from 'firebase/storage';
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
    const [formArray, setFormArray] = useState([]);
    const navigation = useNavigation();
    const [selectedTipoNovedad, setSelectedTipoNovedad] = useState([]);
    const [selectedPredio, setSelectedPredio] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState([]);
    const [selectedHour, setSelectedHour] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const [empresaPredios, setEmpresaPredios] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);







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
                    setSelectedImage(result.assets[0].uri);
                }
            } else {
                console.log('Permiso denegado para acceder a la galería');
            }
        } catch (error) {
            console.error('Error en ImagePicker:', error);
        }
    };

    const handleImageUpload = async () => {
        try {
            if (!selectedImage) {
                console.log('No se ha seleccionado ninguna imagen');
                return;
            }

            const imageUri = selectedImage;
            const imageExtension = imageUri.split('.').pop(); // Obtener la extensión de la imagen

            const storageRef = storage().ref(`uploads/${Date.now()}.${imageExtension}`);
            await storageRef.putFile(imageUri);

            const downloadURL = await storageRef.getDownloadURL();
            console.log('URL de descarga:', downloadURL);

            // Agregar la URL de descarga a la lista de imágenes subidas
            setUploadedImages((prevUploadedImages) => [...prevUploadedImages, downloadURL]);

            setSelectedImage(null); // Limpiar la imagen seleccionada
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    };

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

            const fileDownloadURLs = await Promise.all(selectedFiles.map(async (file) => {
                const storageRef = firebase.storage().ref(`uploads/${file.name}`);
                await storageRef.putFile(file.uri);
                return storageRef.getDownloadURL();
            }));


            const dataToSend = {
                vigilador: data.vigilador,
                vigiladorNovedad: data.vigiladorNovedad,
                tipoNovedad: selectedTipoNovedad,
                horaHecho: selectedHour,
                predio: selectedPredio,
                empresaSeleccionada: selectedEmpresa,
                novedad1: data.novedad1,
                predioOtro: formData.predioOtro || '',
                empresaOtro: formData.empresaOtro || '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                archivosAdjuntos: fileDownloadURLs,
            };

            setFormArray((prevFormArray) => {
                const newFormArray = [dataToSend, ...prevFormArray];
                return newFormArray;
            });

            console.log('Form data added to the formArray:', dataToSend);

            await database.collection('form').add({ dataToSend });
            alert('Form made', dataToSend);

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

            {/* Vigilador que detecta la novedad */}
            <KeyboardAvoidingView style={styles.box}>
                <Text style={styles.container}>Vigilador que detecta</Text>
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
                    name="vigiladorNovedad"
                    rules={{ required: true, maxLength: 80 }}
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

                {/* Mostrar las imágenes subidas */}
                {uploadedImages.map((imageUrl, index) => (
                    <Image key={index} source={{ uri: imageUrl }} style={styles.uploadedImage} />
                ))}
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleFormSubmit)}>
                    <Text style={styles.submitButtonText}>Submit</Text>
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
    button: {
        backgroundColor: 'blue',
        borderRadius: 2,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'white',
        marginBottom: 30,
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    box: {
        backgroundColor: 'black'
    }
});
export default CrimeForm