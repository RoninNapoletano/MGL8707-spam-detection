import { Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from "react";
import { Snackbar, Text } from "react-native-paper";

import { useAlert } from "../contexts/Alert";



const screenWidth = Dimensions.get('window').width;
const isPortrait = screenWidth < Dimensions.get('window').height;

const isMobileDevice = Platform.OS === 'ios' || Platform.OS === 'android';
const isTabletDevice = isMobileDevice && screenWidth >= 768;

const SnackBar = () => {
  const { alert, dispatch } = useAlert();
  const [alertSyle, setAlertStyle] = useState({
    backgroundColor: 'blue',
    alignSelf: 'center'

  });

  useEffect(() => {
    switch (!!alert && alert.alertType || 'default') {
      case "info":
        setAlertStyle({
          backgroundColor: 'blue',
        });
        break;
      case "error":
        setAlertStyle({
          backgroundColor: 'red',
        });
        break;
      case "success":
        setAlertStyle({
          backgroundColor: 'green',
          width: isMobileDevice ? (isPortrait ? 350 : '50%') : isTabletDevice ? 400 : 465,
          alignSelf: 'center'
        });
        break;
      default:
        setAlertStyle({
          backgroundColor: 'purple',
        });
    }
  }, [alert]);

  const closeMe = () => {
    dispatch({ type: "close" }); // Pas besoin de l'opérateur "!" car "dispatch" est toujours défini dans ce contexte
  };

  return (
    <>
      {alert && alert.open && ( // Pas besoin de vérifier la double négation "!!"
        <Snackbar
          style={alertSyle}
          visible
          onDismiss={closeMe}
          action={{
            label: "Ok",
            onPress: closeMe,
          }}
        >
          <Text style={{color: 'white'}}>{alert && alert.message}</Text>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;
