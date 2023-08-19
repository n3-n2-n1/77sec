import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Linking } from 'react-native';
import firebase from '../database/firebaseC'; // Import your firebase configuration
import Svg, { Path } from 'react-native-svg';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';


const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;
  const navigation = useNavigation();
  const [shouldShowDeleteButton, setShouldShowDeleteButton] = useState(true); // Adjust this as needed

  const handleDownloadPDF = async () => {
    try {
      const pdfPath = await generatePDF(report);
      await sharePDFInWhatsApp(pdfPath);
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
    }
  };

  const generatePDF = async (reportData) => {
    const pdfPath = `${FileSystem.cacheDirectory}/reporte.pdf`;
    const pdfDoc = await PDFDocument.create();

    const page = PDFPage.create()
      .setMediaBox(595.276, 841.890)
      .drawText('Detalles del Informe', {
        x: 50,
        y: 750,
        color: '#000000',
      })
      .drawText(`ID: ${reportData.id}`, {
        x: 50,
        y: 730,
        color: '#000000',
      })
      .drawText(`Lugar: ${reportData.predio}`, {
        x: 50,
        y: 710,
        color: '#000000',
      })
    // Add more drawText lines with other report data

    pdfDoc.addPages(page);

    const pdfBytes = await pdfDoc.save();
    await FileSystem.writeAsStringAsync(pdfPath, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return pdfPath;
  };

  const sharePDFInWhatsApp = async (pdfPath) => {
    const shareOptions = {
      url: `file://${pdfPath}`,
      type: 'application/pdf',
      message: '¡Aquí está el informe en PDF!',
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  const handleDeleteReport = async () => {
    try {
      const reportRef = firebase.firestore().collection('form').doc(report.id);
      await reportRef.delete();
      console.log('Reporte eliminado exitosamente.');
      alert('Reporte eliminado', 'El reporte se eliminó correctamente.', [
        {
          text: 'Aceptar',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
    }
  };

  return (
    <View style={styles.container}>



      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg width={30} height={30} viewBox="0 0 1024 1024" fill="#000000">
            <Path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill="#FDC826"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title}>Detalle del Informe</Text>
      </View>

      <ScrollView>

        <Text style={styles.data}>ID: {report.id}</Text>
        <Text style={styles.data}>Lugar: {report.predio}</Text>
        <Text style={styles.data}>Vigilador: {report.vigilador}</Text>
        <Text style={styles.data}>Vigilador que lo detecta: {report.vigiladorNovedad}</Text>
        <Text style={styles.data}>Descripcion: {report.novedad1}</Text><View style={styles.imageContainer}>
          <View style={styles.imageContainer}>
            {report.archivosAdjuntos.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            ))}
          </View>
        </View>


      </ScrollView>
      {/* Agregar más detalles según sea necesario */}

      <TouchableOpacity style={styles.button} onPress={handleDownloadPDF}>
        <Text style={styles.buttonText}>Descargar PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={sharePDFInWhatsApp}>
        <Text style={styles.buttonText}>Compartir PDF</Text>
      </TouchableOpacity>

      {shouldShowDeleteButton && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteReport}>
          <Text style={styles.buttonText}>Eliminar Reporte</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const shouldShowDeleteButton = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3780C3',
    padding: 15,
    fontFamily: 'Epilogue-Variable',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    fontFamily: 'Epilogue-Variable',

  },
  button:{
    padding: 15,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 25,
    paddingBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  image: {
    width: 200,
    height: 200,
    margin: 4,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Epilogue-Variable',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 800,
    paddingRight: 15,
    fontFamily: 'Epilogue-Variable',

  },
  data: {
    fontFamily: 'Epilogue-Variable',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    paddingBottom: 10,

  },
});

export default ReportDetailScreen;
