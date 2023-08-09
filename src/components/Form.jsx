import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import firebase from 'firebase/compat/app';
import { database } from '../database/firebaseC'

const loadFonts = async () => {
    await Font.loadAsync({
        'epilogue-regular': require('../../assets/fonts/Epilogue-Variable.ttf'),
        'epilogue-bold': require('../../assets/fonts/EpilogueItalic.ttf'),
        // Add other styles (e.g., italic, semibold, etc.) if you have them
    });
};

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




    const FilePicker = () => {
        const handleFilePick = async () => {
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],
                });

                // Aquí puedes procesar el archivo seleccionado (por ejemplo, subirlo a Firebase o guardar la ruta del archivo).
                console.log('Archivo seleccionado:', res);
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    console.log('Cancelado por el usuario');
                } else {
                    console.error('Error al seleccionar el archivo:', err);
                }
            }
        };
    }

    useEffect(() => {
        loadFonts();
    }, []);


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
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
            <View style={styles.box}>
                <Text style={styles.container}>Vigilador de turno</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Completo"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="vigilador"
                    rules={{ required: true, maxLength: 100 }}
                    defaultValue=""
                />
            </View>

            {/* Vigilador que detecta la novedad */}
            <View style={styles.box}>
                <Text style={styles.container}>Vigilador que detecta la novedad</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Completo"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="vigiladorNovedad"
                    rules={{ required: true, maxLength: 80 }}
                    defaultValue=""
                />
            </View>

            {/* Notice Type */}
            <View style={styles.box}>
                <Text style={styles.container}>Tipo de novedad</Text>
                {news.map((newSuccess, index) => (
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
                ))}
                <Controller
                    style={styles.box}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Otro"
                            onChangeText={(text) => {
                                onChange(text);
                                setFormData((prevData) => ({ ...prevData, tipoNovedadOtro: text }));
                            }}
                            value={value}
                        />
                    )}
                    name="tipoNovedadOtro"
                    defaultValue=""
                />
            </View>

            {/* Hora del hecho */}
            <View style={styles.box}>
                <Text style={styles.container}>Horario de alerta</Text>
                {hours.map((hour, index) => (
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
                ))}
            </View>

            <View style={styles.box}>
                <Text style={styles.container}>Predio</Text>
                {empresaPredios.map((predio, index) => (
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
                ))}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Otro"
                            onChangeText={(text) => {
                                onChange(text);
                                setFormData((prevData) => ({ ...prevData, predioOtro: text }));
                            }}
                            value={value}
                        />
                    )}
                    name="predioOtro"
                    defaultValue=""
                />
            </View>

            {/* Empresa */}
            <View style={styles.box}>
                <Text style={styles.container}>Empresa</Text>
                {empresas.map((empresaItem, index) => (
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
                ))}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Otro"
                            onChangeText={(text) => {
                                onChange(text);
                                setFormData((prevData) => ({ ...prevData, empresaOtro: text }));
                            }}
                            value={value}
                        />
                    )}
                    name="empresaOtro"
                    defaultValue=""
                />
            </View>
            <View style={styles.box}>
                <Text style={styles.container}>Novedad 1</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Novedad"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="novedad1"
                    rules={{ required: true, maxLength: 80 }}
                    defaultValue=""
                />
            </View>


            <View style={styles.button}>
                <TouchableOpacity onPress={FilePicker}>
                    <Text>Seleccionar archivo</Text>
                </TouchableOpacity>
                {selectedFile && <Text>Archivo seleccionado: {selectedFile}</Text>}
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
        paddingBottom: 16,
        paddingTop: 16,
        color: 'white',
        flex: 1,
        fontSize: 25
    },

    containerScroll: {
        width: '100%',
        padding: 10,
        backgroundColor: 'black',
        fontFamily: 'epilogue-regular',
    },

    input: {
        borderRadius: 60,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        color: 'white',
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
        fontWeight: 'bold',
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
        fontSize: 15
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#3498db',
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