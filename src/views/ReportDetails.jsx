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

  const timestamp = report.timestamp; // Supongamos que report es el objeto donde tienes el timestamp

  const formattedDate = new Date(timestamp.seconds * 1000); // Multiplicamos por 1000 para convertir segundos en milisegundos


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

      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.container}>

        <View style={{
              fontFamily: 'Epilogue-Variable',
              fontWeight: 'bold',
              fontSize: 25,
              color: 'white',
              borderWidth:0.5,
              borderColor: 'white',
              borderRadius: 25,
              justifyContent:'center',
              padding: 11,
              marginBottom: 20,
        }}>

        <Text style={styles.data}>ID: {report.id}</Text>
        
        </View>
        
        <Text style={styles.data1}>Empresa: {report.empresa}</Text>
        <Text style={styles.data1}>Predio: {report.predio}</Text>
        <Text style={styles.data1}>Vigilador: {report.vigilador}</Text>
        <Text style={styles.data1}>Reportado al sistema: {formattedDate.toLocaleString()}</Text>
        <Text style={styles.data1}>Descripcion: {report.novedad1}</Text><View style={styles.imageContainer}>
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



      <TouchableOpacity style={{

        padding: 15,
        color: 'white',
        borderRadius: 25,
        backgroundColor: 'green',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'center'
      }} onPress={sharePDFInWhatsApp}>
        <Svg
          fill="#fff"
          height="20px"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 308 308"
          xmlSpace="preserve"
          stroke="#fff"
        >
          <Path d="M227.904 176.981c-.6-.288-23.054-11.345-27.044-12.781-1.629-.585-3.374-1.156-5.23-1.156-3.032 0-5.579 1.511-7.563 4.479-2.243 3.334-9.033 11.271-11.131 13.642-.274.313-.648.687-.872.687-.201 0-3.676-1.431-4.728-1.888-24.087-10.463-42.37-35.624-44.877-39.867-.358-.61-.373-.887-.376-.887.088-.323.898-1.135 1.316-1.554 1.223-1.21 2.548-2.805 3.83-4.348a140.77 140.77 0 011.812-2.153c1.86-2.164 2.688-3.844 3.648-5.79l.503-1.011c2.344-4.657.342-8.587-.305-9.856-.531-1.062-10.012-23.944-11.02-26.348-2.424-5.801-5.627-8.502-10.078-8.502-.413 0 0 0-1.732.073-2.109.089-13.594 1.601-18.672 4.802C90 87.918 80.89 98.74 80.89 117.772c0 17.129 10.87 33.302 15.537 39.453.116.155.329.47.638.922 17.873 26.102 40.154 45.446 62.741 54.469 21.745 8.686 32.042 9.69 37.896 9.69h.001c2.46 0 4.429-.193 6.166-.364l1.102-.105c7.512-.666 24.02-9.22 27.775-19.655 2.958-8.219 3.738-17.199 1.77-20.458-1.348-2.216-3.671-3.331-6.612-4.743z" />
          <Path d="M156.734 0C73.318 0 5.454 67.354 5.454 150.143c0 26.777 7.166 52.988 20.741 75.928L.212 302.716a3.998 3.998 0 004.999 5.096l79.92-25.396c21.87 11.685 46.588 17.853 71.604 17.853C240.143 300.27 308 232.923 308 150.143 308 67.354 240.143 0 156.734 0zm0 268.994c-23.539 0-46.338-6.797-65.936-19.657a3.996 3.996 0 00-3.406-.467l-40.035 12.726 12.924-38.129a4.002 4.002 0 00-.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 0-65.543 53.754-118.867 119.826-118.867 66.064 0 119.812 53.324 119.812 118.867.001 65.535-53.746 118.851-119.811 118.851z" />
        </Svg>
        <Text style={styles.buttonText}>Compartir via WhatsApp</Text>
      </TouchableOpacity>

      {shouldShowDeleteButton && (
        <TouchableOpacity style={styles.button} onPress={handleDeleteReport}>
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
  button: {
    backgroundColor: 'red',
    padding: 15,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  image: {
    width: 320,
    height: 320,
    margin: 2,
    padding: 10,
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

  },
  data1: {
    fontFamily: 'Epilogue-Variable',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    paddingBottom: 10,

  },

});

export default ReportDetailScreen;
