import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, Linking } from 'react-native';
import firebase from '../database/firebaseC'; // Import your firebase configuration
import Svg, { Path } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';




const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;
  const navigation = useNavigation(); // Mover useNavigation aquí


  const handleDownloadPDF = async () => {
  //   try {
  //     let imagesHtml = '';
  
  //     if (Platform.OS === 'web') {
  //       // En la versión web, simplemente utiliza las URLs existentes de las imágenes
  //       imagesHtml = report.archivosAdjuntos.map((imageUrl) => `
  //         <img src="${imageUrl}" style="max-width: 100%;" />
  //       `).join('');
  //     } else {
  //       // Convertir las imágenes a datos base64 y generar el HTML para las imágenes
  //       const imagePromises = report.archivosAdjuntos.map(async (imageUrl) => {
  //         const response = await fetch(imageUrl);
  //         const blob = await response.blob();
  //         const data = await blobToBase64(blob);
  //         return `<img src="data:image/jpeg;base64,${data}" style="max-width: 100%;" />`;
  //       });
  
  //       const imageDataArray = await Promise.all(imagePromises);
  //       imagesHtml = imageDataArray.join('');
  //     }
  
  //     const htmlContent = `
  //       <html>
  //       <head>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //           }
  //           .title {
  //             font-size: 24px;
  //             font-weight: bold;
  //             margin-bottom: 10px;
  //           }
  //           .data {
  //             font-size: 16px;
  //             margin-bottom: 5px;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="title">Detalle del Informe</div>
  //         <div class="data">ID: ${report.id}</div>
  //         <div class="data">Lugar: ${report.predio}</div>
  //         <div class="data">Vigilador: ${report.vigilador}</div>
  //         <div class="data">Vigilador que lo detecta: ${report.vigiladorNovedad}</div>
  //         <div class="data">Descripcion: ${report.novedad1}</div>
  //         ${imagesHtml}
  //       </body>
  //       </html>
  //     `;

  //     const pdfFile = await Print.printToFileAsync({ html: htmlContent, width: 612, height: 792 });

  //     // Abre el archivo PDF en una pestaña nueva
  //     await Linking.openURL(pdfFile.uri);
  
  //   } catch (error) {
  //     console.error('Error al crear y descargar el PDF:', error);
  //   }
  // };

  // const blobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = () => {
  //       resolve(reader.result.split(',')[1]);
  //     };
  //     reader.readAsDataURL(blob);
  //   });
  };


  const handleDeleteReport = () => {
    // Lógica para eliminar el reporte desde Firebase
    const reportRef = firebase.firestore().collection('form').doc(report.id);

    reportRef
      .delete()
      .then(() => {
        console.log('Reporte eliminado exitosamente.');
        alert('Reporte eliminado', 'El reporte se eliminó correctamente.', [
          {
            text: 'Aceptar',
            onPress: () => {
              // Navegar de regreso a la página de reportHistory
            },
          },
        ]);
        navigation.goBack(); // Usar navigation aquí
      }).catch((error) => {
        console.error('Error al eliminar el reporte:', error);
        // Manejar el error si es necesario
      });
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

      { shouldShowDeleteButton && (
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
    backgroundColor: 'black',
    paddingHorizontal: 20,
    fontFamily: 'Epilogue-Variable',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    fontFamily: 'Epilogue-Variable',

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
    fontFamily: 'Epilogue-Variable',

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
    color: 'white'

  },
});

export default ReportDetailScreen;
