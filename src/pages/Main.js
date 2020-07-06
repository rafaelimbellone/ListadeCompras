import React,{useEffect, useState} from 'react';
import{View, 
       Text, 
       StyleSheet, 
       TouchableOpacity, 
       FlatList, 
       AsyncStorage
    } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function  Main({ navigation }){

    const [books, setBooks] = useState([]); 

    useEffect(() => {
      AsyncStorage.getItem('Livros').then(data => {
         const book = JSON.parse(data);
         setBooks(book);
       });     
    },[]);

    const onBookEdit = (bookId) => {
        const book = books.find(item => item.id === bookId);
        navigation.navigate('Book', {Livros: book, isEdit: true});
    }

    const onBookDelete = async (bookId) => {
      const newBook = books.filter(item => item.id !== bookId);
      console.log(newBook);
      await AsyncStorage.setItem('Livros', JSON.stringify(newBook));
      setBooks(newBook);
    };

    const onBookRead = async (bookId) => {
      const newBook = books.map(item => {
        if(item.id === bookId){
          item.read = !item.read;
        }
        return item;
      });
      
      await AsyncStorage.setItem('Livros', JSON.stringify(newBook));
      setBooks(newBook);     
    }

    return(
       <View style={styles.container}>
        <View style={styles.toolBox}>
            <Text style={styles.title}>Lista de Compras</Text>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => {navigation.navigate('Book')}}>
             <Icon name= 'add' size={30} color='#FFFFFF'/>
            </TouchableOpacity>
          </View>
          <View style={styles.boxTitle}>
            <Text style={styles.boxTitleText}>Item</Text>
            <Text style={styles.boxTitleText}>Qtd</Text>
          </View>
        <FlatList data={books}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                  <View style={styles.itensContainer}>
                    <TouchableOpacity style={styles.itemButton}
                                      onPress={() => onBookRead(item.id)}>
                      <Text style={[styles.itemText, item.read ? styles.itemRead : '']}>{item.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemButton}
                                      onPress={() => onBookRead(item.id)}>
                      <Text style={[styles.itemTextQtd, item.read ? styles.itemRead : '']}>{item.qtd}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} 
                                      onPress={() => onBookEdit(item.id)}
                    >
                      <Icon name= 'create' size={21} color='#2ECC71'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.delButton} 
                                      onPress={() => onBookDelete(item.id)}
                    >
                      <Icon name= 'delete' size={21} color='#c0392b'/>
                    </TouchableOpacity>
                  </View>
                  
                )}
                  
        />
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: 5,
      marginTop:20,
      backgroundColor:'#ffeaa7',
      borderRadius: 50,
    },
    toolBox:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginBottom:18,
    },
    boxTitle:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:10,
      marginRight:100,
      marginLeft:40,
      borderBottomColor:'#2c3e50',
      borderBottomWidth:1,
    },
    boxTitleText:{
      fontSize:19,
      color:'#636e72',
      fontWeight:'bold',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'#636e72',
        marginLeft:50,
        marginTop: 20,
        borderBottomColor:'#2c3e50',
        borderBottomWidth:1,
    },
    buttonAdd:{
        backgroundColor:'#636e72',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        width:38,
        height:38,
        marginRight:10,
        marginTop: 20,
    },
    itensContainer:{
      flexDirection:'row',
      borderBottomColor:'#2c3e50',
      borderBottomWidth:1,
      marginBottom:0,
    },
    itemButton:{
      flex:1,
    },
    editButton:{
      justifyContent: 'space-between',
      marginRight:10,
    },
    itemText:{
      fontSize:18,  
      flexDirection:'row',
      paddingLeft:25,
    },
    itemTextQtd:{
      fontSize:18,  
      flexDirection:'row',
      paddingLeft:80,
    },
    itemRead:{
     textDecorationLine:'line-through',
     color:'#95A5A6',
    },
    delButton:{
       marginRight:15,
    },
})