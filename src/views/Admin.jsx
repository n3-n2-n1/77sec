import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';


const AdminPanel = () => {
  const navigation = useNavigation();


  return (
    <ScrollView style={styles.container}>

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
          Administrador
        </Text>
      </View>

      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => navigation.navigate('calendar')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
            <Path d="M6,22H18a3,3,0,0,0,3-3V7a2,2,0,0,0-2-2H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H5A2,2,0,0,0,3,7V19A3,3,0,0,0,6,22ZM5,12.5a.5.5,0,0,1,.5-.5h13a.5.5,0,0,1,.5.5V19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1Z" fill="#000000" />
          </Svg>
          <Text style={styles.gridButtonText}>Calendario</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('AdminApproval')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
            <Path d="M6,22H18a3,3,0,0,0,3-3V7a2,2,0,0,0-2-2H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H5A2,2,0,0,0,3,7V19A3,3,0,0,0,6,22ZM5,12.5a.5.5,0,0,1,.5-.5h13a.5.5,0,0,1,.5.5V19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1Z" fill="#000000" />
          </Svg>
          <Text style={styles.gridButtonText}>Solicitudes</Text>
        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => navigation.navigate('addCompany')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 512 512" fill="none">
            <Path
              d="M185.469407,39.207713 L356.136074,39.207713 L356.136074,81.8743797 L185.469407,81.8743797 L185.469407,39.207713 Z M185.469407,188.541046 L356.136074,188.541046 L356.136074,231.207713 L185.469407,231.207713 L185.469407,188.541046 Z M119.285384,7.10542736e-15 L144.649352,19.5107443 L68.6167605,118.353113 L-4.26325641e-14,58.3134476 L21.0721475,34.2309934 L64.0400737,71.8050464 L119.285384,7.10542736e-15 Z M119.285384,149.333333 L144.649352,168.844078 L68.6167605,267.686446 L-4.26325641e-14,207.646781 L21.0721475,183.564327 L64.0400737,221.13838 L119.285384,149.333333 Z M356.136074,273.87438 L356.135407,337.87338 L420.136074,337.87438 L420.136074,380.541046 L356.135407,380.54038 L356.136074,444.541046 L313.469407,444.541046 L313.469407,380.54038 L249.469407,380.541046 L249.469407,337.87438 L313.469407,337.87338 L313.469407,273.87438 L356.136074,273.87438 Z"
              fill="#000000"
            />
          </Svg>
          <Text style={styles.gridButtonText}>Agregar Empresa</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 512 512" fill="none">
            <Path
              d="M384,234.666667 L383.999333,298.666667 L448,298.666667 L448,341.333333 L383.999333,341.332667 L384,405.333333 L341.333333,405.333333 L341.332333,341.332667 L277.333333,341.333333 L277.333333,298.666667 L341.332333,298.666667 L341.333333,234.666667 L384,234.666667 Z M213.333333,1.42108547e-14 C362.666667,1.42108547e-14 426.666667,170.666667 426.666667,170.666667 C426.666667,170.666667 419.806465,188.960536 405.337387,213.569457 L405.333333,213.333333 L354.651041,213.332518 C366.256821,196.877829 374.660833,181.433195 379.954347,170.658773 C361.9296,133.970133 307.595093,42.6666667 213.333333,42.6666667 C119.114667,42.6666667 64.7850667,133.88928 46.7136,170.67328 C64.7370667,207.3632 119.071573,298.666667 213.333333,298.666667 C228.597918,298.666667 242.815495,296.272256 256.00151,292.102854 L256.001906,336.459743 C242.635306,339.59149 228.419781,341.333333 213.333333,341.333333 C64,341.333333 3.55271368e-14,170.666667 3.55271368e-14,170.666667 C3.55271368e-14,170.666667 64,1.42108547e-14 213.333333,1.42108547e-14 Z M213.333333,96 C254.57024,96 288,129.42976 288,170.666667 C288,211.903573 254.57024,245.333333 213.333333,245.333333 C172.096427,245.333333 138.666667,211.903573 138.666667,170.666667 C138.666667,129.42976 172.096427,96 213.333333,96 Z M213.333333,138.666667 C195.688747,138.666667 181.333333,153.02208 181.333333,170.666667 C181.333333,188.311253 195.688747,202.666667 213.333333,202.666667 C230.97792,202.666667 245.333333,188.311253 245.333333,170.666667 C245.333333,153.02208 230.97792,138.666667 213.333333,138.666667 Z"
              fill="#000000"
            />
          </Svg>
          <Text style={styles.gridButtonText}>Agregar vigilante</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddAdmin')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 512 512" fill="none">
            <Path
              d="M384,234.666667 L383.999333,298.666667 L448,298.666667 L448,341.333333 L383.999333,341.332667 L384,405.333333 L341.333333,405.333333 L341.332333,341.332667 L277.333333,341.333333 L277.333333,298.666667 L341.332333,298.666667 L341.333333,234.666667 L384,234.666667 Z M213.333333,1.42108547e-14 C362.666667,1.42108547e-14 426.666667,170.666667 426.666667,170.666667 C426.666667,170.666667 419.806465,188.960536 405.337387,213.569457 L405.333333,213.333333 L354.651041,213.332518 C366.256821,196.877829 374.660833,181.433195 379.954347,170.658773 C361.9296,133.970133 307.595093,42.6666667 213.333333,42.6666667 C119.114667,42.6666667 64.7850667,133.88928 46.7136,170.67328 C64.7370667,207.3632 119.071573,298.666667 213.333333,298.666667 C228.597918,298.666667 242.815495,296.272256 256.00151,292.102854 L256.001906,336.459743 C242.635306,339.59149 228.419781,341.333333 213.333333,341.333333 C64,341.333333 3.55271368e-14,170.666667 3.55271368e-14,170.666667 C3.55271368e-14,170.666667 64,1.42108547e-14 213.333333,1.42108547e-14 Z M213.333333,96 C254.57024,96 288,129.42976 288,170.666667 C288,211.903573 254.57024,245.333333 213.333333,245.333333 C172.096427,245.333333 138.666667,211.903573 138.666667,170.666667 C138.666667,129.42976 172.096427,96 213.333333,96 Z M213.333333,138.666667 C195.688747,138.666667 181.333333,153.02208 181.333333,170.666667 C181.333333,188.311253 195.688747,202.666667 213.333333,202.666667 C230.97792,202.666667 245.333333,188.311253 245.333333,170.666667 C245.333333,153.02208 230.97792,138.666667 213.333333,138.666667 Z"
              fill="#000000"
            />
          </Svg>
          <Text style={styles.gridButtonText}>Agregar administrador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('vigilantesView')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
            <Path
              d="M18.5 19.5L20 21M11 21H5.6C5.03995 21 4.75992 21 4.54601 20.891C4.35785 20.7951 4.20487 20.6422 4.10899 20.454C4 20.2401 4 19.9601 4 19.4V17.6841C4 17.0485 4 16.7306 4.04798 16.4656C4.27087 15.2344 5.23442 14.2709 6.46558 14.048C6.5425 14.0341 6.6237 14.0242 6.71575 14.0172C6.94079 14 7.05331 13.9914 7.20361 14.0026C7.35983 14.0143 7.4472 14.0297 7.59797 14.0722C7.74302 14.1131 8.00429 14.2315 8.52682 14.4682C9.13692 14.7446 9.8015 14.9218 10.5 14.9795M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.gridButtonText}>Lista de Vigilantes</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => navigation.navigate('Empresas')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 512 512" fill="none">
            <Path
              d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666333,217.591333 L167.724208,141.269742 L232.938667,173.866667 L280.864376,130.738196 L295.135624,146.595138 L236.398693,199.458376 L173.589333,168.064 L120.324333,234.666333 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z"
              fill="#000000"
            />
          </Svg>
          <Text style={styles.gridButtonText}>Lista de Empresas</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.gridButtonContainer} onPress={() => navigation.navigate('CalculateHours')}>
            <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
              <Path d="M9 12.08L11 14L15 10" stroke="#e599ff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" />
            </Svg>
            <Text style={styles.gridButtonText}>Contabilidad</Text>

          </TouchableOpacity>




        <TouchableOpacity
          onPress={() => navigation.navigate('reportHistory')}
          style={styles.gridButtonContainer}
        >
          <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 15L15.5 16.5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M8.5 12.5C8.5 14.1569 9.84315 15.5 11.5 15.5C12.3299 15.5 13.081 15.163 13.6241 14.6185C14.1654 14.0758 14.5 13.327 14.5 12.5C14.5 10.8431 13.1569 9.5 11.5 9.5C9.84315 9.5 8.5 10.8431 8.5 12.5Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z"
              fill="#000000"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.gridButtonText}>Lista de Reportes</Text>
        </TouchableOpacity>




      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
    fontFamily: 'Epilogue-Variable',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 800,
    paddingRight: 16,
  },
  buttonContainer: {
    gap: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardText: {
    fontSize: 24,
    marginBottom: 4,
    fontFamily: 'Epilogue-Variable',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
  },
  gridButtonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    fontFamily: 'Epilogue-Variable',
  },
  gridButtonText: {
    color: 'black', // Color del texto del título
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Epilogue-Variable',
    paddingTop: 10 
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },

});

export default AdminPanel;