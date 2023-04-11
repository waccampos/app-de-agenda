import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { FontAwesome, AntDesign,Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { Modala } from './modal';

export default function App() {
  const [remedios, setRemedios] = useState([
    
  ])

  const [visivel, setVisivel] = useState(false);
  const [nomeRemedio, setNomeRemedio] = useState("");
  const [horario, setHorario] = useState("");


  const removedor = (key) =>{
    const filterRemedios = remedios.filter(item => item.key != key)
    setRemedios(filterRemedios); 
  }
  const color = (key) => {
    setRemedios(remedios.map((item) => {
      if (item.key === key) {
        item.colored = !item.colored;
      }
      return item;
    }));
  };

  const adicionarRemedio = () => {
    if (nomeRemedio && horario) {
      setRemedios([
        ...remedios,
        {
          nome: nomeRemedio,
          hora: horario,
          colored: false,
          key: remedios.length + 1,
        },
      ]);
      setVisivel(false);
      setNomeRemedio('');
      setHorario('');
      
    }
  };
  
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
          <Text style={styles.title}>
            agenda de remedios
          </Text>
        <View style={styles.iconheader}>
          <TouchableOpacity onPress={() => setVisivel(true)}>
            <Ionicons name="add" size={40} color="black" />
          </TouchableOpacity>
        </View>
        

      </View>
      <View style={styles.boxlist}>
        <FlatList
          style={styles.lista}
          numColumns={1}
          keyExtractor={(item) => item.key}
          data={remedios}
          renderItem={({item}) => (
          
          <View style={
            [styles.containerbox,
            {backgroundColor: item.colored ? '#7FF53F': '#96F2EE'
            }]}>
              
            <View style={styles.boxhora}>
              <Text style={styles.item}>{item.hora}</Text>
            </View>

            <View style={styles.boxname}>
              <Text style={styles.item}>{item.nome}</Text>
            </View>
            
            <View style={styles.boxicons}>
              <TouchableOpacity onPress={() => removedor(item.key)}>
                <FontAwesome name="trash-o" size={45} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => color(item.key) }>
                <AntDesign name="check" size={45} color="black" />
              </TouchableOpacity>
            </View>

          </View>
          
        )}
        />
        
      </View>

      <Modal
        visible={visivel}
        transparent={true}
      >
        <Modala
        setVisivel={setVisivel}
        setNomeRemedio={setNomeRemedio}
        setHorario={setHorario}
        adicionarRemedio={adicionarRemedio}
        />
      </Modal>
      
      <StatusBar style="auto" />
    </View>
  );
}


