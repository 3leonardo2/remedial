import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const NuevoHorarioScreen = ({ navigation }) => {
    const [valvulas, setValvulas] = useState([]);
    const [selectedValvula, setSelectedValvula] = useState(null);
    const [apertura, setApertura] = useState(new Date());
    const [cerrado, setCerrado] = useState(new Date());
    const [indefinido, setIndefinido] = useState(false);
    const [dias, setDias] = useState('');
    const [showPicker, setShowPicker] = useState({ apertura: false, cerrado: false });

    useEffect(() => {
        fetch('https://tu-api.com/valvulas')
            .then(response => response.json())
            .then(data => {
                const opciones = data.map(valvula => ({
                    label: `${valvula.Valvulas.descripcion} - ${valvula.Valvulas.ubicacion}`,
                    value: valvula.Valvulas.id_valvula
                }));
                setValvulas(opciones);
            })
            .catch(error => console.error('Error al obtener válvulas:', error));
    }, []);

    const crearHorario = () => {
        if (!selectedValvula) {
            Alert.alert('Error', 'Seleccione una válvula');
            return;
        }
        
        const horario = {
            id_valvula: selectedValvula,
            horario_apertura: apertura,
            horario_cerrado: cerrado,
            indefinido,
            dias: indefinido ? null : dias
        };
        
        fetch('https://tu-api.com/crearHorario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horario)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                Alert.alert('Éxito', 'Horario creado correctamente', [{ text: 'OK', onPress: () => navigation.goBack() }]);
            } else {
                Alert.alert('Error', 'No se pudo crear el horario');
            }
        })
        .catch(error => console.error('Error al crear horario:', error));
    };

    return (
        <View>
            <Text>Seleccionar válvula</Text>
            <DropDownPicker
                items={valvulas}
                open={true}
                setOpen={() => {}}
                value={selectedValvula}
                setValue={setSelectedValvula}
            />
            
            <Text>Horario de apertura</Text>
            <TouchableOpacity onPress={() => setShowPicker({ ...showPicker, apertura: true })}>
                <Text>{apertura.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showPicker.apertura && (
                <DateTimePicker value={apertura} mode='time' is24Hour={true} display='default' onChange={(event, date) => {
                    setApertura(date || apertura);
                    setShowPicker({ ...showPicker, apertura: false });
                }}/>
            )}
            
            <Text>Horario de cerrado</Text>
            <TouchableOpacity onPress={() => setShowPicker({ ...showPicker, cerrado: true })}>
                <Text>{cerrado.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showPicker.cerrado && (
                <DateTimePicker value={cerrado} mode='time' is24Hour={true} display='default' onChange={(event, date) => {
                    setCerrado(date || cerrado);
                    setShowPicker({ ...showPicker, cerrado: false });
                }}/>
            )}
            
            <Text>Indefinido</Text>
            <Switch value={indefinido} onValueChange={setIndefinido} />
            
            {!indefinido && (
                <View>
                    <Text>Establecer días</Text>
                    <TextInput keyboardType='numeric' value={dias} onChangeText={setDias} />
                </View>
            )}
            
            <TouchableOpacity onPress={crearHorario}>
                <Text>CREAR NUEVO HORARIO</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NuevoHorarioScreen;