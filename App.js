import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');
const transitions = <Transition.Change durationMs={400} interpolation="easeInOut" />

export default class App extends Component {
  state = {
    modal: false,
  };
  ref = React.createRef();

  toggleModal = () => {
    this.ref.current.animateNextTransition();
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <Transitioning.View style={styles.container} ref={this.ref} transition={transitions}>

        <TouchableOpacity onPress={this.toggleModal}>
          <Text style={styles.button}>
            {!this.state.modal ? 'Open Modal Here' : 'But here you can close'}
          </Text>
        </TouchableOpacity>
        <View style={[styles.modal, !this.state.modal ? { top: height } : null]}>
          <Text style={styles.issue}>
            Touchables can't be tapped when inside a view that transitions
          </Text>
          <TouchableOpacity onPress={this.toggleModal}>
            <Text style={styles.button}>
              Close Modal Here. I bet you can't
          </Text>
          </TouchableOpacity>
          <Text style={styles.issue}>
            This is a text input and doesn't work either
          </Text>
          <TextInput style={styles.textInput} placeholder="You can't focus here either" />
        </View>
      </Transitioning.View >
    );
  }
}

const styles = StyleSheet.create({
  issue: {
    padding: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    fontSize: 18,
    backgroundColor: 'gray',
    padding: 20,
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    width: 230,
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 5,
    height: height - 80,
    justifyContent: 'center',
    alignItems: 'center',
    top: 80,
    elevation: 6,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FEFF',
    alignItems: 'center',
  },
});
