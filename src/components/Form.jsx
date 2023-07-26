import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
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

const empresa = ["Legionarios", "Latin-Sec"];

const predios = [
    'EGS', 'Escobar', 'Lanzone', 'Loma Hermosa', 'Stefani', 'Jose c. Paz',
    'Palomar', 'Santo Domingo', 'Merlo', 'La plata', 'Zarate', 'Once',
    'Constitución', 'Derqui', 'Cazador', 'Marcos paz', 'El cruce',
    'Sol y Verde', 'Matera 741',
];

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
        setSelectedEmpresa((prevSelectedEmpresa) => {
            if (prevSelectedEmpresa.includes(selectedOption)) {
                return prevSelectedEmpresa.filter((option) => option !== selectedOption);
            } else {
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
                {predios.map((predio, index) => (
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
                {empresa.map((e, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.radio}
                        onPress={() => {
                            handleEmpresaChange(e);
                        }}
                    >
                        <View style={styles.radioCircle}>
                            <Text>
                                {selectedEmpresa.includes(e) && <View style={styles.selectedRb} />}
                            </Text>
                        </View>
                        <Text style={styles.radioText}>{e}</Text>
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