import React, {useState, useEffect} from 'react';
import {View, 
        Text,
        TextInput, 
        TouchableOpacity, 
        StyleSheet, 
        AsyncStorage
      } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Book({ navigation }){
    
    const book = navigation.getParam('Livros',{
      title: '',
      description: '',
      read: false,
      photo:'',
    })    

    const [books, setBooks]             = useState([]);
    const [title, setTitle]             = useState(book.title);
    const [qtd, setQtd]                 = useState(book.qtd);
    const [photo, setPhoto]             = useState(book.photo);
    const [read, setRead]               = useState(Book.read);

    const isEdit = navigation.getParam('isEdit', false);

    useEffect(() => {
      AsyncStorage.getItem('Livros').then(data => {
          const book = JSON.parse(data);
          setBooks(book);
         });      
     },[]);

      const isValue = () => {
        if(title != undefined && title != ''){
          return true;
        }
         return false;        
      }
      const onSave = async () => {
      
       if(isValue()){
          // se for true altera o livros
          if(isEdit){
            let editBook = books;
            editBook.map(item => {
              if(item.id === book.id){
                item.title       = title;
                item.qtd         = qtd;
                item.photo       = photo;
                item.read        = read;
              }
              return item;
            })
            await AsyncStorage.setItem('Livros', JSON.stringify(editBook));
          //senão adicona livro
          }else{
            const id = Math.random(2000).toString();  
            const data = {
              id,
              title,
              qtd,
              photo,
              read: false,
            };
            //incluir no array um dados.
            books.push(data);
            await AsyncStorage.setItem('Livros', JSON.stringify(books));
          }
          navigation.navigate('Main');
       } else {
         console.log('INVALIDO');
       }
    }

      return (
          <View style={styles.container}>
            <Text style={styles.pageTitle}>Adicione um produto na lista...</Text>
            <View>
            <TextInput style={styles.input} 
                          placeholder="Item para compra"
                          placeholderTextColor="#999"    
                          value={title}
                          onChangeText={setTitle}                                        
            />
            <TextInput style={styles.input} 
                          placeholder="Quantidade"
                          placeholderTextColor="#999" 
                          keyboardType='numeric'    
                          value={qtd}
                          onChangeText={setQtd}
                                      
            />
            <TouchableOpacity style={styles.cameraButton}>
                <Icon name='photo-camera' size={20} color='#FFFFFF'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} 
                                    onPress={onSave}
            >
              <Text style={styles.saveButtonText}>{isEdit ? 'Atualizar' : 'Salvar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {navigation.goBack();}}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            </View>
          </View>
      )
    }

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            padding:25,
            marginTop:10,
            backgroundColor:'#ffeaa7',
            borderRadius: 50,
        },
        pageTitle:{
          fontSize:18,
          fontWeight:'bold',
          color:'#636e72',
          marginTop: 10,
          alignSelf:'center',
        },
        input: {
            fontSize: 16,
            borderBottomColor:'#F39C12',
            borderBottomWidth:1,
            marginBottom:20,
            marginTop:20,
        },
        cameraButton:{
            backgroundColor:'#636e72',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:50,
            width:40,
            height:40,
            marginTop:15,
            marginBottom:20,
            alignSelf:'center',
        },
        saveButton:{
          backgroundColor:'#636e72',
          alignSelf:'center',
          width:200,
          height:50,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:5,
          marginBottom:20,
        },
        saveButtonInvalid:{
          backgroundColor:'#F39C12',
          alignSelf:'center',
          width:200,
          height:50,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:5,
          marginBottom:20,
          opacity:0.5,
          
        },
        saveButtonText:{
          fontSize:18,
          fontWeight:'bold',
          color:'#FFFFFF',
        },
        cancelButton:{
            alignSelf:'center',
            width:200,
            height:50,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:5,
          },
          cancelButtonText:{
            fontSize:20,
            fontWeight:'bold',
            color:'#000',
          },
    });
