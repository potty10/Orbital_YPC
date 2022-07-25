import {
  View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList,
} from 'react-native';
import {
  collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc,
} from 'firebase/firestore';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';
import AddToDoModal from '../components/AddToDoModal';
import { useAuthentication, db } from '../../firebase';

export default function ToDo({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [toDos, setToDos] = React.useState([]);
  const { user } = useAuthentication();

  const loadToDoList = async () => {
    const q = query(collection(db, 'todos'), where('userId', '==', user.uid));

    const querySnapshot = await getDocs(q);
    const toDos = [];
    querySnapshot.forEach((doc) => {
      const toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  const checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  const deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, 'todos', toDoId));
    const updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  const renderToDoItem = ({ item }) => (
    <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
      <View style={AppStyles.fillSpace}>
        <BouncyCheckbox
          isChecked={item.complated}
          size={25}
          fillColor="#258ea6"
          unfillColor="#FFFFFF"
          text={item.text}
          iconStyle={{ borderColor: '#258ea6' }}
          onPress={(isChecked) => { checkToDoItem(item, isChecked); }}
        />
      </View>
      <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteToDo(item.id)} />
    </View>
  );

  const showToDoList = () => (
    <FlatList
      data={toDos}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadToDoList();
        setIsRefreshing(true);
      }}
      renderItem={renderToDoItem}
      keyExtractor={(item) => item.id}
    />
  );

  const addToDo = async (todo) => {
    const toDoToSave = {
      text: todo,
      completed: false,
      userId: user.uid,
    };
    const docRef = await addDoc(collection(db, 'todos'), toDoToSave);

    toDoToSave.id = docRef.id;

    const updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };

  return (
    <SafeAreaView>
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin]}>
        <InlineTextButton text="Manage Account" color="#258ea6" onPress={() => navigation.navigate('Manage Account')} />
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
        />
      </Modal>
      <Text style={AppStyles.header}>ToDo</Text>
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList() }
        <Button
          title="Add ToDo"
          onPress={() => setModalVisible(true)}
          color="#fb4d3d"
        />
      </View>
    </SafeAreaView>
  );
}
